/*global window, CodeMirror, fail, Observer, toastr, Templates, Mousetrap, _, Tipped */

(function () {
    'use strict';
    var surveyPath = 'selfserve/' + location.pathname.replace(/\/apps\/lumos\//, '').split(':')[0];
    var isReadOnly = /\/temp-view$/.test(surveyPath);
    var lastError = null;
    var errorList = []
    var ALT_MODES = ['vim'];  // add ?mode=<mode> to url
    var PREFIX = 'xmledit-';
    var CLASSES = {
        undoButton: 'undo-command',
        redoButton: 'redo-command',
        save: PREFIX + 'save',
        errors: PREFIX + 'errors',
        findNext: PREFIX + 'find-next',
        findPrevious: PREFIX + 'find-previous',
        replace: PREFIX + 'replace',
        replaceAll: PREFIX + 'replace-all',
        textarea: PREFIX + 'textarea',
        changed: PREFIX + 'changed',
        saving: PREFIX + 'saving',
        saveSucceeded: PREFIX + 'success',
        saveFailed: PREFIX + 'save-failed',
        reset: PREFIX + 'reset',
        settings: PREFIX + 'settings',
        openFile: PREFIX + "open-file",
        saveFile: PREFIX + "save-file",
        undo: PREFIX + 'undo',
        redo: PREFIX + 'redo',
        help: PREFIX + 'help',
        about: PREFIX + 'about',
        projectinfo: PREFIX + 'project-info',
        slg: PREFIX + 'slg',
        terminal: PREFIX + 'terminal',
        standardscheck: PREFIX + 'standards-check',
        diffCheck: PREFIX + 'diff-check',
        warnings: "warnings"
    };

    var SELECTORS = {
        container: '.' + PREFIX + 'container',
        undoButton: '.' + CLASSES.undoButton,
        redoButton: '.' + CLASSES.redoButton,
        save: '.' + CLASSES.save,
        textarea: '.' + CLASSES.textarea,
        savingModal: '.' + PREFIX + 'saving-modal',
        errorModal: '.' + PREFIX + 'error-modal',
        errorDetails: '.' + PREFIX + 'error-modal-error-details-go-here',
        testSurvey: '.' + PREFIX + 'test-survey',
        splashScreen: '.' + PREFIX + 'splashscreen'
    };

    var EVENTS = {
        saving: 'on-' + PREFIX + 'saving',
        saveSucceeded: 'on-' + PREFIX + 'save-succeeded',
        saveFailed: 'on-' + PREFIX + 'save-failed',
        changed: 'on-' + PREFIX + 'changed',
        undoable: 'on-' + PREFIX + 'undoable',
        nonUndoable: 'on-' + PREFIX + 'non-undoable',
        redoable: 'on-' + PREFIX + 'redoable',
        nonRedoable: 'on-' + PREFIX + 'non-redoable'
    };

    //Sample source default variable map

    var shared_defaults = {
        c: {
            name: "Country",
            readonly: false,
            hidden: false,
            options: [
            { name: "Australia", value: "19" },
            { name: "New Zealand", value: "42" },
            { name: "China", value: "20" },
            { name: "Hong Kong", value: "46" },
            { name: "Japan", value: "21" },
            { name: "Singapore", value: "43" },
            { name: "UK", value: "1" },
            { name: "USA", value: "2" },
            { name: "France", value: "3" },
            { name: "Italy", value: "4" },
            { name: "Germany", value: "5" },
            { name: "Spain", value: "6" },
            { name: "Sweden", value: "7" },
            { name: "Denmark", value: "8" },
            { name: "Norway", value: "9" },
            { name: "Greece", value: "10" },
            { name: "Hungary", value: "11" },
            { name: "Czech Republic", value: "12" },
            { name: "Poland", value: "13" },
            { name: "Russia", value: "14" },
            { name: "South Korea", value: "15" },
            { name: "Thailand", value: "16" },
            { name: "UK (Welsh)", value: "17" },
            { name: "Ireland", value: "18" },
            { name: "Austria", value: "22" },
            { name: "India", value: "23" },
            { name: "Turkey", value: "24" },
            { name: "UAE", value: "25" },
            { name: "Argentina", value: "26" },
            { name: "Brazil", value: "27" },
            { name: "Venezuela", value: "28" },
            { name: "Columbia", value: "29" },
            { name: "Switzerland", value: "30" },
            { name: "Portugal", value: "31" },
            { name: "Canada", value: "32" },
            { name: "Mexico", value: "33" },
            { name: "Malaysia", value: "34" },
            { name: "South Africa", value: "35" },
            { name: "Tunisia", value: "36" },
            { name: "Belgium", value: "37" },
            { name: "Netherlands", value: "38" },
            { name: "Israel", value: "39" },
            { name: "Saudi Arabia", value: "40" },
            { name: "Finland", value: "41" },
            { name: "Chile", value: "44" },
            { name: "Taiwan", value: "45" },
            { name: "Indonesia", value: "47" }
            ]
        }
    }

    var nexus_defaults = {
        extraVars: {
            psid: { readonly: true, hidden: true },
            pp: { readonly: true, hidden: true },
            sp: { readonly: true, hidden: true },
            pid: { readonly: true, hidden: true },
            sc: { readonly: true, hidden: true },
            ppid: { readonly: true, hidden: true }
        },
        globalVars: {
            c: shared_defaults.c,
            w: {
                name: "Wave",
                readonly: false,
                hidden: false,
                options: [
                { name: "Wave 1", value: "1" },
                { name: "Wave 2", value: "2" },
                { name: "Wave 3", value: "3" },
                { name: "Wave 4", value: "4" },
                { name: "Wave 5", value: "5" },
                { name: "Wave 6", value: "6" },
                { name: "Wave 7", value: "7" },
                { name: "Wave 8", value: "8" },
                { name: "Wave 9", value: "9" },
                { name: "Wave 10", value: "10" },
                { name: "Wave 11", value: "11" },
                { name: "Wave 12", value: "12" },
                { name: "Wave 13", value: "13" },
                { name: "Wave 14", value: "14" },
                { name: "Wave 15", value: "15" },
                { name: "Wave 16", value: "16" },
                { name: "Wave 17", value: "17" },
                { name: "Wave 18", value: "18" },
                { name: "Wave 19", value: "19" },
                { name: "Wave 20", value: "20" },
                { name: "Wave 21", value: "21" },
                { name: "Wave 22", value: "22" },
                { name: "Wave 23", value: "23" },
                { name: "Wave 24", value: "24" },
                { name: "Wave 25", value: "25" },
                { name: "Wave 26", value: "26" },
                { name: "Wave 27", value: "27" },
                { name: "Wave 28", value: "28" },
                { name: "Wave 29", value: "29" },
                { name: "Wave 30", value: "30" },
                { name: "Wave 31", value: "31" },
                { name: "Wave 32", value: "32" },
                { name: "Wave 33", value: "33" },
                { name: "Wave 34", value: "34" },
                { name: "Wave 35", value: "35" },
                { name: "Wave 36", value: "36" },
                { name: "Wave 37", value: "37" },
                { name: "Wave 38", value: "38" },
                { name: "Wave 39", value: "39" },
                { name: "Wave 40", value: "40" },
                { name: "Wave 41", value: "41" },
                { name: "Wave 42", value: "42" },
                { name: "Wave 43", value: "43" },
                { name: "Wave 44", value: "44" },
                { name: "Wave 45", value: "45" },
                { name: "Wave 46", value: "46" },
                { name: "Wave 47", value: "47" },
                { name: "Wave 48", value: "48" },
                { name: "Wave 49", value: "49" },
                { name: "Wave 50", value: "50" }
                ]
            },
            FLAG: {
                name: "Sample Flag",
                readonly: false,
                hidden: false,
                options: [
                    { name: "OFF or Not required", value: "0" },
                    { name: "Nat Rep", value: "1" },
                    { name: "Targeting", value: "2" }
                ]
            }
        }
    }

    var sts_defaults = {
        extraVars: {
            c: shared_defaults.c,
            rnid: { readonly: true, hidden: false },
            study: { readonly: true, hidden: false },
            stsd5: { readonly: true, hidden: false },
            stsd4: { readonly: true, hidden: false },
            stsd7: { readonly: true, hidden: false },
            stsd6: { readonly: true, hidden: false },
            stsd1: { readonly: true, hidden: false },
            stsd3: { readonly: true, hidden: false },
            stsd2: { readonly: true, hidden: false },                   
            src: {
                name: "Source",
                readonly: false,
                hidden: false,
                options: [
                    { name: "Default", value: "" },
                    { name: "VOP UK (United Kingdom)", value: "1" },
                    { name: "VOP FR (France)", value: "2" },
                    { name: "VOP IT (Italy)", value: "3" },
                    { name: "VOP DE (Germany)", value: "4" },
                    { name: "VOP ES (Spain)", value: "5" },
                    { name: "VOP AU (Australia)", value: "6" },
                    { name: "VOP AT (Austria)", value: "7" },
                    { name: "VOP NO (Norway)", value: "8" },
                    { name: "VOP PL (Poland)", value: "9" },
                    { name: "VOP RU (Russia)", value: "10" },
                    { name: "VOP IE (Ireland)", value: "11" },
                    { name: "VOP CH (Switzerland) - German", value: "12" },
                    { name: "VOP DK (Denmark)", value: "13" },
                    { name: "VOP FI (Finland)", value: "14" },
                    { name: "VOP SE (Sweden)", value: "15" },
                    { name: "VOP NL (Netherlands)", value: "16" },
                    { name: "VOP GR (Greece)", value: "17" },
                    { name: "VOP BE (Belgium) - Dutch", value: "18" },
                    { name: "VOP CZ (Czech Rep)", value: "19" },
                    { name: "VOP PT (Portugal)", value: "20" },
                    { name: "VOP HU (Hungary)", value: "21" },
                    { name: "VOP USA (United States) - English", value: "22" },
                    { name: "VOP BR (Brazil)", value: "23" },
                    { name: "VOP USA (United States) - Spanish", value: "24" },
                    { name: "VOP BE (Belgium) - French", value: "25" },
                    { name: "VOP CH (Switzerland) - French", value: "26" },
                    { name: "VOP CH (Switzerland) - Italian", value: "27" },
                    { name: "VOP CH (Switzerland) - English", value: "28" },
                    { name: "VOP NZ (New Zealand) - English", value: "29" },
                    { name: "VOP ME (Mexico)", value: "30" },
                    { name: "VOP IN (India)", value: "31" },
                    { name: "VOP CN (China)", value: "32" },
                    { name: "VOP SING (Simplified Chinese)", value: "33" },
                    { name: "VOP CHIL", value: "34" },
                    { name: "VOP SING (English)", value: "35" },
                    { name: "VOP ARG", value: "36" },
                    { name: "VOP CAN (Canada) - English", value: "37" },
                    { name: "VOP CAN (Canada) - French", value: "38" },
                    { name: "VOP JAP (Japan)", value: "39" },
                    { name: "VOP SKOR (South Korea)", value: "40" },
                    { name: "Mum's Opinions", value: "41" },
                    { name: "VOP South Africa", value: "42" },
                    { name: "B2B UK", value: "43" },
                    { name: "Research Now", value: "44" },
                    { name: "VOP HK (Chinese)", value: "45" },
                    { name: "VOP HK (English)", value: "46" },
                    { name: "VOP Taiwan", value: "47" },
                    { name: "VOP Malaysia (Malay)", value: "48" },
                    { name: "VOP Malaysia (English)", value: "49" },
                    { name: "E-Rewards (English)", value: "50" },
                    { name: "E-Rewards (Germany)", value: "51" },
                    { name: "E-Rewards (Spain)", value: "52" },
                    { name: "E-Rewards (France)", value: "53" },
                    { name: "E-Rewards (Netherlands)", value: "54" },
                    { name: "E-Rewards (Portugal)", value: "55" },
                    { name: "E-Rewards MMR", value: "56" },
                    { name: "E-Rewards UTB (English)", value: "57" },
                    { name: "E-Rewards (Canada-French)", value: "58" },
                    { name: "E-Rewards (US-Spanish)", value: "59" },
                    { name: "E-Rewards (Mexico-Spanish)", value: "60" },
                    { name: "Webmiles DE", value: "61" },
                    { name: "Swiss Webmiles DE", value: "62" },
                    { name: "Swiss Webmiles FR", value: "63" },
                    { name: "VOP Indonesia", value: "64" },
                    { name: "VOP Thailand", value: "65" },
                    { name: "VOP Turkey", value: "66" },
                    { name: "E-Miles", value: "67" },
                    { name: "Peanut Labs", value: "68" },
                    { name: "AirMiles", value: "69" },
                    { name: "Lightspeed North America", value: "70" },
                    { name: "Lightspeed Australia", value: "71" },
                    { name: "Lightspeed Europe", value: "72" },
                    { name: "eRewards", value: "73" },
                    { name: "ePocrates", value: "74" },
                    { name: "Leger", value: "75" },
                    { name: "ToLuna", value: "76" },
                    { name: "MedSite", value: "77" },
                    { name: "Ipsos", value: "78" },
                    { name: "Pureprofile", value: "79" },
                    { name: "Ticketekrewards", value: "80" },
                    { name: "veda advantage", value: "81" },
                    { name: "aussie survey", value: "82" },
                    { name: "Ciao", value: "83" },
                    { name: "Greenfield", value: "84" },
                    { name: "Livra", value: "85" },
                    { name: "AIP", value: "86" },
                    { name: "GFK", value: "87" },
                    { name: "CINT", value: "88" },
                    { name: "Livra", value: "89" },
                    { name: "Debrand 1", value: "90" },
                    { name: "Debrand 2", value: "91" },
                    { name: "Debrand 3", value: "92" },
                    { name: "Debrand 4", value: "93" },
                    { name: "Debrand 5", value: "94" },
                    { name: "Debrand 6", value: "95" },
                    { name: "Debrand 7", value: "96" },
                    { name: "Debrand 8", value: "97" },
                    { name: "Debrand 9", value: "98" },
                    { name: "CATCH ALL", value: "99" },
                    { name: "Nectar Canvass", value: "101" },
                    { name: "MMR (EN_UK)", value: "560" },
                    { name: "MMR (EN_CA)", value: "561" },
                    { name: "MMR (FR_CA)", value: "562" },
                    { name: "MMR (DE_DE)", value: "563" },
                    { name: "MMR (FR_FR)", value: "564" },
                    { name: "MMR (IT_IT)", value: "565" },
                    { name: "MMR (ES_ES)", value: "566" },
                    { name: "ERI Nectar", value: "731" }
                ]
            }
        }
    }


    var $errorWidget = $("<div class='survey-error'><i class='fa icon-error'></i> <span class='msg'/></div>");

    function showErrors() {
        var $modal = $(SELECTORS.errorModal);
        var $details = $modal.find(SELECTORS.errorDetails);

        if (!lastError) {
            return;
        }

        $details.html(lastError);
        $modal.modal('show');
    }

    function Btn($btn, isDisabled, classes) {
        this.$btn = $btn;
        this.classes = $.extend({
            enabled: '',
            disabled: ''
        }, classes || {});
        this._disabled = null;
        if (isDisabled) {
            this.disable();
        } else {
            this.enable();
        }
    }

    $.extend(Btn.prototype, {
        disable: function disable() {
            if (this._disabled !== true) {
                this.$btn.addClass('disabled');
                this.$btn.removeClass(this.classes.enabled);
                this.$btn.addClass(this.classes.disabled);
                this.$btn[0].disabled = true;
                this._disabled = true;
            }
        },
        enable: function enable() {
            if (this._disabled !== false) {
                this.$btn.removeClass('disabled');
                this.$btn.removeClass(this.classes.disabled);
                this.$btn.addClass(this.classes.enabled);
                this.$btn[0].disabled = false;
                this._disabled = false;
            }
        },
        isDisabled: function isDisabled() {
            return this._disabled;
        },
        click: function click(fn) {
            var me = this;
            if (fn) {
                // set a click handler
                if ($.isFunction(fn)) {
                    this.$btn.click(function () {
                        if (!me.isDisabled()) {
                            return fn.apply(me, arguments);
                        }
                    });
                }
            } else {
                return this.$btn.click();
            }
        }
    });

    var saveBtn = new Btn($(SELECTORS.save), true, {enabled: 'btn-success'});
    var testSurveyBtn = new Btn($(SELECTORS.testSurvey));
    var undoBtn = new Btn($(SELECTORS.undoButton), true, {});
    var redoBtn = new Btn($(SELECTORS.redoButton), true, {});

    function DecipherClips(codemirror, options) {
        var defaultOptions = {
            comments: {
                radioComment: "Select one.",
                radioGridComment: "Select one in each row.",
                checkboxComment: "Select all that apply.",
                textComment: "Please be as specific as possible.",
                textareaComment: "Please be as specific as possible.",
                numberComment: "Please enter a whole number.",
                floatComment: "",
                selectComment: "",
                datepickerComment: "Please select a date.",
                sliderratingComment: "Drag the slider to a point on the scale."
            },
            noanswerKeyword: [
                "none",
                "none of the above",
                "none of these",
                "don\'t know",
                "prefer not to answer",
                "prefer not to say",
                "not sure"
            ],
            extraKeyword: [
                "other",
                "specify"
            ]
        }
        this.codemirror = codemirror
        this.options = Object.assign(defaultOptions, options || {})
    }

    DecipherClips.prototype.cleanInput = function(input) {
        return input.filter(x => x != "")
    }

    DecipherClips.prototype.formatQuestion = function(input) {
        input = input.replace("\n\n", "\n")
        var elements = this.getElements(input)
        input = elements ? input.substr(0, input.indexOf(elements[0])) : input
        input = input.replace(/\n/g, "\x20").trim()
        var attributeMatch = input.match(/([a-zA-Z0-9_]*(?:\[.*?\])?)(?:[\=\:\.\)\s\t]*)(.*)/sm)
        var label = /^\d+/.test(attributeMatch[1]) ? "Q" + attributeMatch[1] : attributeMatch[1]
        var title = attributeMatch[2].trim()
        return { questionLabel: label, questionTitle: title, questionElements: elements }
    }

    DecipherClips.prototype.getElements = function(input) {
        input = input.replace(/\n\n/gm, "")
        var searchElement = ["comment", "row", "col", "choice", "noanswer", "exec", "validate", "group", "insert"]
        var regexPattern = searchElement.map(x => "[^\\S\\r\\n]*<" + x + "[^]*?>([^]*?)</" + x + ">|[^\\S\\r\\n]*<" + x + "[^]*/>")
        var elements = input.match(new RegExp(regexPattern.join("|"), "gm"))        
        return elements
    }

    DecipherClips.prototype.escapeInput = function(input) {
        return input.replace(/&/g, "&amp;")
    }

    DecipherClips.prototype.constructTag = function(tag, attributes, inner) {
        var output = "<" + tag
        for(var key in attributes) {
            if(attributes[key] != null && attributes[key] != "") {
                output += "\x20" + key + "=\""+ attributes[key] + "\""
            }
        }
        output += ">"
        output += inner
        output += "</" + tag + ">"
        return output
    }

    DecipherClips.prototype.constructQuestion = function(type, label, title, attributes, elements) {
        var tab = "\x20".repeat(2)
        var tag = ""
        var comment = ""
        var hasComment = elements != null ? elements.some(x => x.includes("<comment")) : false
        var hasRows = elements != null ? elements.some(x => x.includes("<row")) : false
        var hasCols = elements != null ? elements.some(x => x.includes("<col")) : false
        
        var gridQuestion = hasRows && hasCols
        var comments = this.options.comments

        switch(type) {

            case "radio":
            tag = "radio"
            comment = gridQuestion ? comments.radioGridComment : comments.radioComment
            break
            
            case "checkbox":
            tag = "checkbox"
            comment = comments.checkboxComment
            break
            
            case "text":
            tag = "text"
            comment = comments.textComment
            break
            
            case "textarea":
            tag = "textarea"
            comment = comments.textareaComment
            break
            
            case "number":
            tag = "number"
            comment = comments.numberComment
            break
            
            case "float":
            tag = "float"
            comment = comments.floatComment
            break

            case "select":
            tag = "select"
            comment = comments.selectComment
            break

            case "datepicker":
            tag = "text"
            comment = comments.datepickerComment
            break

            case "sliderrating":
            tag = "select"
            comment = comments.sliderratingComment
            break

        } 

        comment = hasComment ? elements.splice(elements.findIndex(x => x.includes("<comment")), 1) : comment
        comment = (!hasComment && comment) ? "<comment>" + comment + "</comment>" : comment

        var output = "<" + tag + "\n"
        output += tab + "label=\"" + label + "\""

        for(var key in attributes) {
            if(attributes[key] != null && attributes[key] !== "") {
                output += "\n" + tab + key + "=\"" + attributes[key] + "\""
            }
        }

        output += ">"
        output += "\n" + tab + "<title>" + title + "</title>"
        output += comment ? "\n" + tab + comment : ""

        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                var exclusive = (tag === "checkbox") && this.options.noanswerKeyword.some(x => elements[i].toLowerCase().includes(x))
                var element = exclusive && !this.hasAttribute(elements[i], "exclusive") ? this.addAttribute(elements[i], { exclusive: 1 }) : elements[i]
                output += "\n" + tab + element.trim()
            }
        }

        output += "\n" + "</" + tag + ">"
        return output
    }

    DecipherClips.prototype.addAttribute = function(element, attributes) {
        var space = "\x20"
        var indent = space.repeat(/^\s+/.test(element) ? element.match(/^\s+/)[0].length : 0)
        var selfClosingTag = /<(.+)\/>/gs.test(element)
        var extractedElement = selfClosingTag ? element.match(/<(.*?)\/>/s) : element.match(/<(.*?)>(.*)<\/(.*?)>/s) 
        var innerTag = extractedElement[1]
        var innerText = selfClosingTag ? "" : extractedElement[2]
        var closingTag = selfClosingTag ? "" : extractedElement[3]

        console.table([selfClosingTag, innerTag, innerText, closingTag])

        var output = indent + "<" + innerTag
        for(var key in attributes) {
            if(attributes[key] != null && attributes[key] !== "" && !this.hasAttribute(element, key)) {
                output += space + key + "=\"" + attributes[key] + "\""
            }
        }
        output += selfClosingTag ? "/>" : ">" + innerText + "</" + closingTag + ">"
        return output
    }

    DecipherClips.prototype.removeAttribute = function(element, attributes) {
        var output = element
        for(var i = 0; i < attributes.length; i++) {
            var removeAttributeRegex = new RegExp("\\s" + attributes[i] + "=\".+?\"", "g")
            output = output.replace(removeAttributeRegex, "")
        }
        return output
    }

    DecipherClips.prototype.replaceAttribute = function(element, attribute, value) {
        var attributes = this.getAttributes(element)
        var tab = "\x20".repeat(/^\s+/.test(element) ? element.match(/^\s+/)[0].length : 0)
        var replaceAttributeRegex = new RegExp("(" + attribute + ")" + "=" + "\".*?\"", "gm")
        return this.hasAttribute(element, attribute) ? element.replace(replaceAttributeRegex, "$1=\"" + value + "\"") : element
    }

    DecipherClips.prototype.hasAttribute = function(element, attribute) {
        return this.getAttributes(element).hasOwnProperty(attribute)
    }

    DecipherClips.prototype.getAttributes = function(element) {
        var attributes = {}
        var elementFrag = element.match(/<.*?>/)
        var extractedAttributes = elementFrag ? elementFrag[0].match(/[a-zA-Z0-9_\:]*?=\".*?\"/gsm) : ""
        if(extractedAttributes) {
            extractedAttributes.forEach(function(attribute) {
                var splitPair = attribute.split(/[=]/)
                attributes[splitPair[0]] = splitPair[1].replace(/\"/g, "")
            }) 
        }
        console.log(attributes)
        return attributes
    }

    DecipherClips.prototype.getInnerText = function(element) {
        var innerText = element.match(/<.*?>([^]*?)<\/.*?>/)
        return innerText && innerText[1] || null
    }

    DecipherClips.prototype.makeGroups = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
        for(var i = 0; i < selection.length; i++) {
            var tag = "group"
            var innerText = this.escapeInput(selection[i]).trim()
            var attributes = {
                label: "g" + (i+1),
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeCases = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
        for(var i = 0; i < selection.length; i++) {
            var tag = "case"
            var innerText = this.escapeInput(selection[i]).trim()
            var attributes = {
                label: "c" + (i+1),
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")        
    }

    DecipherClips.prototype.makeRows = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
            
        for(var i = 0; i < selection.length; i++) {
            var tag = "row"
            var innerText = this.escapeInput(selection[i]).trim()
            var openEnded = this.options.extraKeyword.every(x => innerText.toLowerCase().includes(x))
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "r" + (i+1),
                open: openEnded ? "1" : "",
                openSize: openEnded ? "25" : "",
                randomize: openEnded || anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeRowsLowToHigh = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
            
        for(var i = 0; i < selection.length; i++) {
            var tag = "row"
            var innerText = this.escapeInput(selection[i]).trim()
            var openEnded = this.options.extraKeyword.every(x => innerText.toLowerCase().includes(x))
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "r" + (i+1),
                value: i+1,
                open: openEnded ? "1" : "",
                openSize: openEnded ? "25" : "",
                randomize: openEnded || anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""            
        }
        this.codemirror.replaceSelection(output, "around")        
    }

    DecipherClips.prototype.makeRowsHighToLow = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
        
        for(var i = selection.length - 1; i >= 0; i--) {
            var tag = "row"
            var innerText = this.escapeInput(selection[i]).trim()
            var openEnded = this.options.extraKeyword.every(x => innerText.toLowerCase().includes(x))
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "r" + (i+1),
                value: i+1,
                open: openEnded ? "1" : "",
                openSize: openEnded ? "25" : "",
                randomize: openEnded || anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += selection.length - 1 != 0 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")        
    }

    DecipherClips.prototype.makeRowsMatchLabel = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
        
        for(var i = 0; i < selection.length; i++) {
            var tag = "row"
            var matchedLabel = selection[i].trim().match(/^\d+/)
            var innerText = this.escapeInput(selection[i].trim().replace(/^\d+[\.\=\:\s]*/, "")).trim()
            var openEnded = this.options.extraKeyword.every(x => innerText.toLowerCase().includes(x))
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "r" + matchedLabel,
                open: openEnded ? "1" : "",
                openSize: openEnded ? "25" : "",
                randomize: openEnded || anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeRowsMatchValues = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)        
        
        for(var i = 0; i < selection.length; i++) {
            var tag = "row"
            var matchedLabel = selection[i].trim().match(/^\d+/)
            var innerText = this.escapeInput(selection[i].trim().replace(/^\d+[\.\=\:\s]*/, "")).trim()
            var openEnded = this.options.extraKeyword.every(x => innerText.toLowerCase().includes(x))
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "r" + matchedLabel,
                value: matchedLabel,
                open: openEnded ? "1" : "",
                openSize: openEnded ? "25" : "",
                randomize: openEnded || anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        output = output.replace(/\n$/, "")
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.convertToRows = function() {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                var tag = "row"
                var attributes = this.getAttributes(elements[i])
                var innerText = this.getInnerText(elements[i])
                var tab = "\x20".repeat(/^\s+/.test(elements[i]) ? elements[i].match(/^\s+/)[0].length : 0)
                attributes["label"] = "r" + attributes["label"].match(/[\d]+/)
                output += tab + this.constructTag(tag, attributes, innerText)
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")    
        }
    }

    DecipherClips.prototype.makeCols = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
        
        for(var i = 0; i < selection.length; i++) {
            var tag = "col"
            var innerText = this.escapeInput(selection[i]).trim()
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "c" + (i+1),
                randomize: anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")    
    }

    DecipherClips.prototype.makeColsLowToHigh = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
            
        
        for(var i = 0; i < selection.length; i++) {
            var tag = "col"
            var innerText = this.escapeInput(selection[i]).trim()
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "c" + (i+1),
                value: i+1,
                randomize: anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")        
    }

    DecipherClips.prototype.makeColsHighToLow = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
            
        
        for(var i = selection.length - 1; i >= 0; i--) {
            var tag = "col"
            var innerText = this.escapeInput(selection[i]).trim()
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "r" + (i+1),
                value: i+1,
                randomize: anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += selection.length - 1 != 0 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")           
    }

    DecipherClips.prototype.makeColsMatchLabel = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
        
        for(var i = 0; i < selection.length; i++) {
            var tag = "col"
            var matchedLabel = selection[i].trim().match(/^\d+/) 
            var innerText = this.escapeInput(selection[i].trim().replace(/^\d+[\.\=\:\s]*/, "")).trim()
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "c" + matchedLabel,
                randomize: anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")    
    }

    DecipherClips.prototype.makeColsMatchValues = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
        
        for(var i = 0; i < selection.length; i++) {
            var tag = "col"
            var matchedLabel = selection[i].trim().match(/^\d+/)
            var innerText = this.escapeInput(selection[i].trim().replace(/^\d+[\.\=\:\s]*/, "")).trim()
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "c" + matchedLabel,
                value: matchedLabel,
                randomize: anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")    
    }

    DecipherClips.prototype.convertToCols = function() {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                var tag = "col"
                var attributes = this.getAttributes(elements[i])
                var innerText = this.getInnerText(elements[i])
                var tab = "\x20".repeat(/^\s+/.test(elements[i]) ? elements[i].match(/^\s+/)[0].length : 0)
                attributes["label"] = "c" + attributes["label"].match(/[\d]+/)
                output += tab + this.constructTag(tag, attributes, innerText)
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")    
        }
    }  

    DecipherClips.prototype.makeChoices = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
        
        for(var i = 0; i < selection.length; i++) {
            var tag = "choice"
            var innerText = this.escapeInput(selection[i]).trim()
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "ch" + (i+1),
                randomize: anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")        
    }

    DecipherClips.prototype.makeChoicesLowToHigh = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
            
        
        for(var i = 0; i < selection.length; i++) {
            var tag = "choice"
            var innerText = this.escapeInput(selection[i]).trim()
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "ch" + (i+1),
                value: i+1,
                randomize: anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")        
    }

    DecipherClips.prototype.makeChoicesHighToLow = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
            
        
        for(var i = selection.length - 1; i >= 0; i--) {
            var tag = "choice"
            var innerText = this.escapeInput(selection[i]).trim()
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "ch" + (i+1),
                value: i+1,
                randomize: anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += selection.length - 1 != 0 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")          
    }   

    DecipherClips.prototype.makeChoicesMatchLabel = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
        
        for(var i = 0; i < selection.length; i++) {
            var tag = "choice"
            var matchedLabel = selection[i].trim().match(/^\d+/)
            var innerText = this.escapeInput(selection[i].trim().replace(/^\d+[\.\=\:\s]*/, "")).trim()
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "ch" + matchedLabel,
                randomize: anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")        
    }

    DecipherClips.prototype.makeChoicesMatchValues = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
        
        for(var i = 0; i < selection.length; i++) {
            var tag = "choice"
            var matchedLabel = selection[i].trim().match(/^\d+/)
            var innerText = this.escapeInput(selection[i].trim().replace(/^\d+[\.\=\:\s]*/, "")).trim()
            var anchor = this.options.noanswerKeyword.some(x => innerText.toLowerCase().includes(x))
            var attributes = {
                label: "ch" + matchedLabel,
                value: matchedLabel,
                randomize: anchor ? "0" : ""
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")        
    }

    DecipherClips.prototype.convertToChoices = function() {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                var tag = "choice"
                var attributes = this.getAttributes(elements[i])
                var innerText = this.getInnerText(elements[i])
                var tab = "\x20".repeat(/^\s+/.test(elements[i]) ? elements[i].match(/^\s+/)[0].length : 0)
                attributes["label"] = "ch" + attributes["label"].match(/[\d]+/)
                output += tab + this.constructTag(tag, attributes, innerText)
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")
        }
    } 

    DecipherClips.prototype.makeNoAnswer = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
        for(var i = 0; i < selection.length; i++) {
            var tag = "noanswer"
            var innerText = this.escapeInput(selection[i]).trim()
            var attributes = {
                label: "n" + (i+1)
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")    
    }  

    DecipherClips.prototype.makeNoAnswerMatchLabel = function() {
        var selection = this.cleanInput(this.codemirror.getSelection().split("\n"))
        var output = ""
        var tab = "\x20".repeat(2)
        
        for(var i = 0; i < selection.length; i++) {
            var tag = "noanswer"
            var matchedLabel = selection[i].trim().match(/^\d+/)
            var innerText = this.escapeInput(selection[i].trim().replace(/^\d+[\.\=\:\s]*/, "")).trim()
            var attributes = {
                label: "n" + matchedLabel
            }
            output += this.constructTag(tag, attributes, innerText)
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.convertToNoAnswer = function() {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if (elements != null) {
            for(var i = 0; i < elements.length; i++) {
                var tag = "noanswer"
                var attributes = this.getAttributes(elements[i])
                var innerText = this.getInnerText(elements[i])
                var tab = "\x20".repeat(/^\s+/.test(elements[i]) ? elements[i].match(/^\s+/)[0].length : 0)
                attributes["label"] = "n" + attributes["label"].match(/[\d]+/)
                output += tab + this.constructTag(tag, attributes, innerText)
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")
        }
    } 

    DecipherClips.prototype.makeRadio = function() {
        var selection = this.codemirror.getSelection()
        var input = this.formatQuestion(selection)
        var type = "radio"
        var title = input["questionTitle"]
        var label = input["questionLabel"]
        var elements = input["questionElements"]
        var attributes = {
            optional: 0,
			"uses":"atm1d.10"
        }
        var output = this.constructQuestion(type, label, title, attributes, elements)
        output += "\n" + "<suspend/>"
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeCheckbox = function() {
        var selection = this.codemirror.getSelection()
        var input = this.formatQuestion(selection)
        var type = "checkbox"
        var title = input["questionTitle"]
        var label = input["questionLabel"]
        var elements = input["questionElements"]
        var attributes = {
            atleast: 1,
			"uses":"atm1d.10"
        }
        var output = this.constructQuestion(type, label, title, attributes, elements)
        output += "\n" + "<suspend/>"
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeSelect = function() {
        var selection = this.codemirror.getSelection()
        var input = this.formatQuestion(selection)
        var tag = "select"
        var title = input["questionTitle"]
        var label = input["questionLabel"]
        var elements = input["questionElements"]
        var attributes = null
        var output = this.constructQuestion(tag, label, title, attributes, elements)
        output += "\n" + "<suspend/>"
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeNumber = function() {
        var selection = this.codemirror.getSelection()
        var input = this.formatQuestion(selection)
        var type = "number"
        var title = input["questionTitle"]
        var label = input["questionLabel"]
        var elements = input["questionElements"]
        var attributes = {
            size: 3,
            optional: 0
        }
        var output = this.constructQuestion(type, label, title, attributes, elements)
        output += "\n" + "<suspend/>"
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeFloat = function() {
        var selection = this.codemirror.getSelection()
        var input = this.formatQuestion(selection)
        var type = "float"
        var title = input["questionTitle"]
        var label = input["questionLabel"]
        var elements = input["questionElements"]
        var attributes = {
            size: 3,
            optional: 0
        }
        var output = this.constructQuestion(type, label, title, attributes, elements)
        output += "\n" + "<suspend/>"
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeText = function() {
        var selection = this.codemirror.getSelection()
        var input = this.formatQuestion(selection)
        var type = "text"
        var title = input["questionTitle"]
        var label = input["questionLabel"]
        var elements = input["questionElements"]
        var attributes = {
            size: 40,
            optional: 0
        }
        var output = this.constructQuestion(type, label, title, attributes, elements)
        output += "\n" + "<suspend/>"
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeTextArea = function() {
        var selection = this.codemirror.getSelection()
        var input = this.formatQuestion(selection)
        var type = "textarea"
        var title = input["questionTitle"]
        var label = input["questionLabel"]
        var elements = input["questionElements"]
        var attributes = {
            optional: 0,
        }
        var output = this.constructQuestion(type, label, title, attributes, elements)
        output += "\n" + "<suspend/>"
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeDatePicker = function() {
        var selection = this.codemirror.getSelection()
        var input = this.formatQuestion(selection)
        var type = "datepicker"
        var title = input["questionTitle"]
        var label = input["questionLabel"]
        var elements = input["questionElements"]
        var attributes = {
            size: 25,
            uses: "fvdatepicker.1",
            verify: "dateRange(mm/dd/yyyy, any, any)",
            optional: 0
        }
        var output = this.constructQuestion(type, label, title, attributes, elements)
        output += "\n" + "<suspend/>"
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeSliderRating = function() {
        var selection = this.codemirror.getSelection()
        var input = this.formatQuestion(selection)
        var type = "sliderrating"
        var title = input["questionTitle"]
        var label = input["questionLabel"]
        var elements = input["questionElements"]
        var attributes = {
            "ss:questionClassNames": "sq-sliderpoints",
            "uses": "sliderpoints.3",
            "optional": 0
        }
        var output = this.constructQuestion(type, label, title, attributes, elements)
        output += "\n" + "<suspend/>"
        this.codemirror.replaceSelection(output, "around")        
    }

    DecipherClips.prototype.makeDefine = function(label) {
        var selection = this.codemirror.getSelection().split("\n")
        var tab = "\x20".repeat(2)
        var output = "<define label=\"" + label + "\">\n"
        for(var i = 0; i < selection.length; i++) {
            output += tab + selection[i].trim() + "\n"
        }
        output += "</define>"
        output += "\n" + "<suspend/>"
        this.codemirror.replaceSelection(output, "around")        
    }

    DecipherClips.prototype.makePipe = function(label) {
        var selection = this.codemirror.getSelection().split("\n")
        var tab = "\x20".repeat(2)
        var output = "<pipe label=\"" + label + "\">\n"
        for(var i = 0; i < selection.length; i++) {
            output += tab + selection[i].trim() + "\n"
        }
        output += "</pipe>"
        output += "\n" + "<suspend/>"
        this.codemirror.replaceSelection(output, "around")       
    }

    DecipherClips.prototype.addValues = function() {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                var attributes = this.getAttributes(elements[i])
                var matchedValue = attributes["label"].match(/[\d]+/)
                output += this.hasAttribute(elements[i], "value") ? elements[i] : this.addAttribute(elements[i], { value: matchedValue })
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")            
        }
    }

    DecipherClips.prototype.removeValues = function() {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        for(var i = 0; i < elements.length; i++) {
            output += this.removeAttribute(elements[i], ["value"])
            output += i != elements.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")  
    }

    DecipherClips.prototype.makeHTML = function(label) {
        var selection = this.codemirror.getSelection().trim()
        var output = "<html label=\"" + label + "\" where=\"survey\">\n"
        output += selection.length > 0 ? selection.replace(/^\s*$/gm, "<br/>".repeat(2)) + "\n" : "\n".repeat(3)
        output += "</html>"
        output += "\n" + "<suspend/>"
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeBlock = function(label) {
        var selection = this.codemirror.getSelection().trim()
        var tab = "\x20".repeat(2)
        var output = "<block label=\"" + label + "\" cond=\"1\">\n"
        output += selection.length > 0 ? selection.split("\n").map(x => tab + x).join("\n") : ""
        output += "\n" + "</block>"
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.makeLoop = function() {
        var selection = this.codemirror.getSelection()
        var tab = "\x20".repeat(2)
        var output = "<loop label=\"\" vars=\"\">\n"
        output += tab + "<block label=\"\" cond=\"1\">" + "\n".repeat(2)
        output += tab + "</block>\n"
        output += tab + "<looprow label=\"\" cond=\"1\">\n"
        output += tab.repeat(2) + "<loopvar name=\"\"></loopvar>\n"
        output += tab + "</looprow>\n"
        output += "</loop>"
        this.codemirror.replaceSelection(output, "around")
    }    

    DecipherClips.prototype.wrapTag = function(tag) {
        var selection = this.codemirror.getSelection().trim()
        var startTag = "<" + tag + ">"
        var closeTag = "</" + tag + ">"
        var wrappedText = startTag + selection + closeTag
        this.codemirror.replaceSelection(wrappedText, "around")
    }

    DecipherClips.prototype.wrapTagEachLines = function(tag) {
        var selection = this.codemirror.getSelection().split("\n");
        var output = "";
        for(var i = 0; i < selection.length; i++) {
            output += "<" + tag + ">" + selection[i].trim() + "</" + tag + ">"
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")
    }

    DecipherClips.prototype.assignGroup = function(groupLabel) {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                var matchedValue = elements[i].match(/[\d]+/)
                output += this.hasAttribute(elements[i], "groups") ? elements[i] : this.addAttribute(elements[i], { groups: groupLabel })
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")
        }
    }

    DecipherClips.prototype.removeGroup = function() {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                output += this.removeAttribute(elements[i], ["groups"])
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")    
        }
    }    

    DecipherClips.prototype.addCond = function(condValue) {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                output += this.hasAttribute(elements[i], "cond") ? elements[i] : this.addAttribute(elements[i], { cond: condValue })
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")              
        }
    }

    DecipherClips.prototype.removeCond = function() {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                output += this.removeAttribute(elements[i], ["cond"])
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")  
        }        
    }

    DecipherClips.prototype.addExclusiveAttribute = function() {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                output += this.addAttribute(elements[i], { exclusive: 1, randomize: 0 })
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")    
        }    
    }  

    DecipherClips.prototype.removeExclusiveAttribute = function() {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                output += this.removeAttribute(elements[i], ["exclusive", "randomize"])
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")  
        }        
    }

    DecipherClips.prototype.addOpenAttribute = function() {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                output += this.addAttribute(elements[i], { open: 1, openSize: 25, randomize: 0})
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")
        }
    }

    DecipherClips.prototype.removeOpenAttribute = function() {
        var elements = this.getElements(this.codemirror.getSelection())
        var output = ""
        if(elements != null) {
            for(var i = 0; i < elements.length; i++) {
                output += this.removeAttribute(elements[i], ["open", "openSize", "randomize"])
                output += i != elements.length - 1 ? "\n" : ""
            }
            this.codemirror.replaceSelection(output, "around")  
        }        
    }

    DecipherClips.prototype.makeComment = function() {
        var selection = this.codemirror.getSelection().replace(/\n\n/gm, "")
        var output = "<comment>" + selection.trim().replace(/\n/gm, "\x20") + "</comment>"
        this.codemirror.replaceSelection(output, "around")
    }
    
    DecipherClips.prototype.reverseString = function() {
        var selection = this.codemirror.getSelection().split("\n")
        var output = ""
        for(var i = 0; i < selection.length; i++) {
            var digit = selection[i].trim().match(/\d+$/)
            var replacedSelection = selection[i].trim().replace(/\d+$/, "")
            output += digit ? digit + " " + replacedSelection : selection[i]
            output += i != selection.length - 1 ? "\n" : ""
        }
        this.codemirror.replaceSelection(output, "around")
    }        
    
    function bindHotkey(decipherClips, defaultKey, configKey, action) {
        var codemirror = decipherClips.codemirror
        var keyBindingList = codemirror.getOption("extraKeys")
        if(defaultKey != configKey) {
            keyBindingList[configKey] = keyBindingList[defaultKey]
            delete keyBindingList[defaultKey]
            return true
        }
        return false
    }

    function CreatePluginOptionsControl(control, callback) {
        
        var row = $("<div>", {
            class: "row-fluid"
        })

        var controlRow = $("<div>", {
            class: "controls span12"
        })

        var label = $("<label>", {
            text: control.label,
            class: "control-label"
        })

        var element = null

        switch(control.element) {

            case "input":
            element = $("<input>", {
                type: "text",
                class: "span12"
            })
            .attr(control.attr)
            break

        }

        controlRow.append(label)
        controlRow.append(element)
        row.append(controlRow)

        typeof(callback) == "function" ? callback(row) : null

    }
    
    function InitializeAboutDialog() {
        var aboutContent = `
        <h4>Decipher Clips CodeMirror Add-on</h4>
        <p>Version 3.1b</p>
        <p>by: Josh Macintosh</p>
        `
        var closeButton = $("<button>", {
            "type": "button",
            "class": "btn btn-primary",
            "data-dismiss": "modal",
            "text": "OK"
        })
    
        var aboutDialog = CreateModalObject("about-modal", "About", aboutContent, closeButton)
    
        $("body").append(aboutDialog)
    }

    function InitializeProjectInfoModal() {
        var projectID = location.pathname.match(/[\d]+(?=(?:\/temp-view)*:xmledit)/)
        var surveyName = $("span.gh-survey-name").text()
        var wireNumber = surveyName.match(/239[0-9]+/) || "--"
        var ORDNumber = surveyName.match(/ORD-[0-9]{6}-[a-zA-Z0-9]{4}/g) || "--"
        var projectname = surveyName

        var content = `
        <h5>Project ID: </h5>
        <div class="input-append">
            <input type="text" class="span6" id="project_id" value="${projectID}" readonly style="height: 22px"/>
            <button class="btn clip-btn" data-clipboard-action="copy" data-clipboard-target="#project_id"><i class="fa fa-copy"></i></button>
        </div>
        <h5>Project Wire #: </h5>
        <div class="input-append">
            <input type="text" class="span6" id="wirenumber" value="${wireNumber}" readonly style="height: 22px"/>
            <button class="btn clip-btn" data-clipboard-action="copy" data-clipboard-target="#wirenumber"><i class="fa fa-copy"></i></button>
        </div>
        <h5>Project ORD #: </h5>
        <div class="input-append">
            <input type="text" class="span6" id="ordnumber" value="${ORDNumber}" readonly style="height: 22px"/>
            <button class="btn clip-btn" data-clipboard-action="copy" data-clipboard-target="#ordnumber"><i class="fa fa-copy"></i></button>
        </div>
        <h5>Project Name</h5>
        <div class="input-append">
            <input type="text" class="span6" id="projectname" value="${projectname}" readonly style="height: 22px"/>
            <button class="btn clip-btn" data-clipboard-action="copy" data-clipboard-target="#projectname"><i class="fa fa-copy"></i></button>
        </div>
        `

        var closeButton = $("<button>", {
            "type": "button",
            "class": "btn btn-primary",
            "data-dismiss": "modal",
            "text": "OK"
        })

        var projectinfoDialog = CreateModalObject("projectinfo-modal", "Project Info", content, closeButton)

        $("body").append(projectinfoDialog)

        var clipboard = new ClipboardJS(".clip-btn")

    }

    function InitializeHelpModal() {
        var closeButton = $("<button>", {
            "type": "button",
            "class": "btn btn-primary",
            "data-dismiss": "modal",
            "text": "Close"
        })
        var helpDialog = CreateModalObject("help-modal", "Help", "", "");
        helpDialog.addClass("big-modal");
        $("body").append(helpDialog);
    }
    
    function InitializeSurveyLinkGenerator() {

        var modalFooter = $("<div>", {
            class: "slg-modal-footer row-fluid"
        })


        var buttonRow = $("<div>", {
            class: "span4"
        })

        var generateButton = $("<button>", {
            id: "generate_link_button",
            type: "button",
            class: "btn btn-info",
            text: "Generate link"
        })

        var closeButton = $("<button>", {
            "type": "button",
            "class": "btn",
            "data-dismiss": "modal",
            "text": "OK"
        })
        

        buttonRow.append(generateButton)
        buttonRow.append(closeButton)

        var modalContent = $("<div>", {
            class: "slg-modal-content"
        })

        var slgContent = $("<form>", {
            class: "slg-form"
        })

        var slgLoaderContainer = $("<div>", {  
            class: "slg-loader-container span8"
        })

        var slgLoader = $("<div>", {
            class: "slg-loader"
        })
        .css("padding-top", "5px")
        .css("display", "none")

        var slgProgressbar = $("<div>", {
            class: "progress progress-striped active"
        })
        .css("margin-bottom", "0")

        var slgBar = $("<div>", {
            class: "bar"
        })
        .css("width", "100%")

        slgProgressbar.append(slgBar)
        slgLoader.append(slgProgressbar)
        slgLoaderContainer.append(slgLoader)
        slgContent.append(slgLoaderContainer)

        var slgExtras = $("<div>", {
            class: "slg-extras"
        })

        var controlPrefix = "slg-"

        var serverControlDefinition = {
            template: {
                name: "Project Template",
                type: "select",
                size: "span3",
                class: controlPrefix + "template select-css",
                options: [
                    { name: "Default", value: "default"},
                    { name: "D-STAR | D-GUST", value: "dstar" },
                    { name: "Digital", value: "digital" }
                ]
            }
        }

        var control1 = CreateFormControls(serverControlDefinition)

        slgContent.append($("<h4>", { text: "Project Template"}))
        slgContent.append(control1)
        slgContent.append(slgExtras)

        var modalContentTabHeader = $("<ul>", {
            id: "slg_content_tabs",
            class: "nav nav-tabs"
        })
        .css("display", "none")

        var modalContentTabContent = $("<div>", {
            class: "tab-content"
        })

        var slgOutput = $("<div>", {
            class: "slg-output"
        })
        .append(
            $ ("<div>", {
                class: "sub-nav"
            })
            .css("display", "flex")
            .append(
                $ ("<a>", {
                    href: "#",
                    click: function(e) {
                        $("#slg_content_tabs a:first").tab("show")
                        $("#generate_link_button").show()
                    }
                })
                .css("font-size", "1.5em")
                .css("flex", "1 1")
                .append($("<i>", { class: "fa fa-chevron-left" }))
                .append($("<span>", { text: "Back" }))
            )
            .append($("<p>", {
                class: "sub-nav-label",
                text: "Generated links"
            })
            .css("flex", "2 1")
            )
            .append(
                $("<div>", {
                    class: "more-menu"
                })
                .css("flex", "0 1")
                .append(
                    $("<a>", {
                        "class": "dropdown-toggle",
                        "data-toggle": "dropdown",
                        "href": "#"
                    })
                    .append($("<i>", {
                        class: "fa fa-ellipsis-v"
                    }))
                )
            )
        )
        .append(
            $ ("<div>", {
                class: "link-output"
            })
        )

        var modalContentHeaders = ["link_builder", "link_output"]
        var modalContentBody = [slgContent, slgOutput]

        modalContentHeaders.forEach(function(element, index) {
            
            $(modalContentTabHeader).append(
                $("<li>", null)
                .toggleClass("active", index == 0)
                .append($("<a>", {
                    href: "#" + element,
                    text: element,
                    "data-toggle": "tab"
                }))
            )
        })

        modalContentBody.forEach(function(element, index) {
            $ (modalContentTabContent).append(
                $("<div>", {
                    id: modalContentHeaders[index],
                    class: "tab-pane fade"
                })
                .toggleClass("active in", index == 0)
                .append(element)
            )
        })

        modalContent.append(modalContentTabHeader)
        modalContent.append(modalContentTabContent)

        modalFooter.append(slgLoaderContainer)
        modalFooter.append(buttonRow)

        var slgModal = CreateModalObject("slg-modal", "Generate Survey Link", modalContent, modalFooter)

        $("body").append(slgModal)

        $(".slg-template").change(function(e) {

            $(".slg-loader").show()
            $("#slg-modal").find(".modal-body").css({
                "pointer-events": "none",
                "filter": "blur(4px)"
            })

            TakeSurvey.helpers.getData(surveyPath).done(function(response) {
                $("#slg-modal").find(".slg-extras").empty()
                LoadSurveyLinkSources(response)
                $(".slg-loader").hide()
                $("#slg-modal").find(".modal-body").removeAttr("style")
            })
        })

        $("#generate_link_button").click(function(e) {
            var templateSelected = $(".slg-template").val()
            var listSelected = $(".slg-list").val()
            var languageSelected = $(".slg-languages").val()
            var listName = $(".slg-list").children().eq(listSelected).text()
            var extraVarsInput = $("#extravars_tab .tab-pane").eq(listSelected).find(".extravar-input")
            var globalVarsInput = $(".globalvar-input")
            var projectPath = location.pathname.match(/(?:\/apps\/lumos\/)(.*?)(?=(?:\/temp-view)*:xmledit)/)[1]
            var surveyURL = location.origin + "/survey/selfserve/" + projectPath
            var dashboardURL = location.origin + "/rep/selfserve/" + projectPath + ":dashboard"
            var dashboardTempURL = location.origin + "/rep/selfserve/" + projectPath + "/temp-edit-live:dashboard"
            var extraVarsMap = {}
            var globalVarsMap = {}
            var sources = {}

            extraVarsInput.each(function(index, element) {
                extraVarsMap[element.name] = element.value
            })

            globalVarsInput.each(function(index, element) {
                globalVarsMap[element.name] = element.value
            })

            if(templateSelected == "dstar" && listName.toLowerCase().includes("dk")) {

                var nexusLiveLinkParams = {
                    list: listSelected,
                    c: globalVarsMap.c,
                    w: globalVarsMap.w,
                    decLang: languageSelected,
                    pid: "<%PID%>",
                    psid: "<%PSID%>",
                    FLAG: globalVarsMap.FLAG
                }

                var nexusTestLinkParams = {
                    list: listSelected,
                    c: globalVarsMap.c,
                    w: globalVarsMap.w,
                    decLang: languageSelected,
                    pid: "DumPID",
                    psid: "DumPSID",
                    FLAG: globalVarsMap.FLAG,
                    isTest: "1"
                }

                var nexusWithPartnerParams = {
                    list: listSelected,
                    c: globalVarsMap.c,
                    w: globalVarsMap.w,
                    decLang: languageSelected,
                    pid: "<%PID%>",
                    psid: "<%PSID%>",
                    sp: "<%SP%>",
                    pp: "<%PP%>",
                    sc: "<%SC%>",
                    ppid: "<%ppid%>",
                    FLAG: globalVarsMap.FLAG
                }

                var nexusTestLinkParamsWithSettings = {
                    list: listSelected,
                    c: globalVarsMap.c,
                    w: globalVarsMap.w,
                    decLang: languageSelected,
                    pid: "DumPID",
                    psid: "DumPSID",
                    settings: "showqid",
                    FLAG: globalVarsMap.FLAG,
                    isTest: "1"
                }
                
                var testLink = surveyURL + "?" + Object.keys(nexusTestLinkParams).map(x => x + "=" + nexusTestLinkParams[x]).join("&")
                var testLinkWithSettings = surveyURL + "?" + Object.keys(nexusTestLinkParamsWithSettings).map(x => x + "=" + nexusTestLinkParamsWithSettings[x]).join("&")
                var liveLink = surveyURL + "?" + Object.keys(nexusLiveLinkParams).map(x => x + "=" + nexusLiveLinkParams[x]).join("&")
                var liveLinkWithPartner = surveyURL + "?" + Object.keys(nexusWithPartnerParams).map(x => x + "=" + nexusWithPartnerParams[x]).join("&")

                OutputGeneratedLinks({
                    "language": {
                        name: "Language",
                        value: languageSelected,
                        type: "text"
                    },
                    "list": {
                        name: "List",
                        value: listName,
                        type: "text"
                    },
                    "testLink": {
                        name: "Test link",
                        value: testLink,
                        type: "link"
                    },
                    "testLinkWithSettings": {
                        name: "Test link with Question ID",
                        value: testLinkWithSettings,
                        type: "link"
                    },
                    "liveLink": {
                        name: "Live link",
                        value: liveLink,
                        type: "link"
                    },
                    "liveLinkWithPartner": {
                        name: "Live link (with Panel Partner)",
                        value: liveLinkWithPartner,
                        type: "link"
                    },
                    QuotaLink: {
                        name: "Live quota link",
                        value: dashboardURL,
                        type: "link"
                    },
                    QuotaTempLink: {
                        name: "External quota link",
                        value: dashboardTempURL,
                        type: "link"
                    }
                })

            } else if(templateSelected == "digital" && listName.toLowerCase().includes("sts")) {

            } else {

                var extravarParams = {}
                var globalvarParams = {}

                for(var key in extraVarsMap) {
                    var extraVarObject = {}
                    extraVarObject[key] = extraVarsMap[key]
                    extraVarsMap[key] ? Object.assign(extravarParams, extraVarObject) : null
                }

                for(var key in globalVarsMap) {
                    var globalVarObject = {}
                    globalVarObject[key] = globalVarsMap[key]
                    globalVarsMap[key] ? Object.assign(globalvarParams, globalVarObject) : null
                }

                // var globalvarParams = Object.entries(globalVarsMap).filter(function(item, index) {
                //     return item[1]
                // })

                // var extravarParams = Object.keys(extraVarsMap).map(function(key, index) {
                //     var queryString = extraVarsMap[key].value ? key + "=" + extraVarsMap[key].value : ""
                //     return queryString
                // })
                // var globalvarParams = Object.keys(globalVarsMap).map(function(key, index) {
                //     var queryString = globalVarsMap[key].value ? key + "=" + globalVarsMap[key].value : ""
                //     return queryString
                // })

                var combinedParams = $.param(Object.assign({}, extravarParams, globalvarParams))

                var defaultLink = surveyURL + (combinedParams ? "?" + combinedParams : "") 

                OutputGeneratedLinks({
                    DefaultLink: {
                        name: "Default link",
                        value: defaultLink,
                        type: "link"
                    },
                    QuotaLink: {
                        name: "Live quota link",
                        value: dashboardURL,
                        type: "link"
                    },
                    QuotaTempLink: {
                        name: "External quota link",
                        value: dashboardTempURL,
                        type: "link"
                    }
                })        
            }
            var clipboard = new ClipboardJS(".copy-link-button", {
                target: function(trigger) {
                    return trigger.previousSibling
                }
            })
            $("#slg_content_tabs a:last").tab("show")
            $(this).hide() 
            $("#slg-modal .modal-body").scrollTop(0);
        })

    }

    function OutputGeneratedLinks(sources) {
        
        $ (".link-output").empty()

        if(sources) {
            for(var key in sources) {
                var label = $("<p>", {
                    text: sources[key].name,
                    class: "output-label"
                })

                switch(sources[key].type) {
                    case "text":
                    var valueElement = $("<p>", {
                        text: sources[key].value,
                        class: "output-value"
                    })
                    $(".link-output").append(label)
                    $(".link-output").append(valueElement)
                    break

                    case "link":
                    var inputContainer = $("<div>", {
                        class: "input-append"
                    })
                    var inputText = $("<input>", {
                        class: "output-value span6",
                        type: "text",
                        value: sources[key].value
                    })
                    .css("height", "22px")
                    .prop("readonly", true)
                    var copyButton = $("<button>", {
                        class: "copy-link-button btn",
                        type: "button"
                    }).append($("<i>", { class: "fa fa-copy" }))
                    $(inputContainer).append(inputText)
                    $(inputContainer).append(copyButton)
                    $(".link-output").append(label)
                    $(".link-output").append(inputContainer)
                    break
                }
            }            
        } else {
            $(".link-output").append($("<p>", {
                class: "text-center",
                text: "No links available"
            }))
        }
    }

    function LoadSurveyLinkSources(data) {

        //Defines
        var controlPrefix = "slg-"
        var slgContent = $(".slg-extras")
        var template = $(".slg-template").val()
        var defName = null
        var samples = data["samples"].map(x => x).map(x => ({ name: x.name, value: x.index}))
        var languages = data["languages"].map(x => x).map(x => ({ name: x.display, value: x.key}))
        var globalVars = data["globalVars"]
        var extraVars = data["samples"].map(x => x).map(x => (
            { samplename: x.name, value: x.index, vars: x.extraVariables}
        )) 
        var virtuals = data["virtuals"]

        var defaultControlDefinition = {
            samplesource: {
                name: "List",
                type: "select",
                size: "span3",
                class: controlPrefix + "list select-css",
                options: samples
            }, 
            languages: {
                name: "Languages",
                type: "select",
                size: "span3",
                class: controlPrefix + "languages select-css",
                options: languages
            }
        }

        var slgTabs = $("<div>", {
            id: "extravars_tab",
            class: "tab-content"
        })
        
        var tabHeaders = $("<ul>", {
            id: "extravars_tab_headers",
            class: "nav nav-tabs"
        })
        .css("display", "none")

        var templateDefs = null

        switch(template) {

            case "dstar":
            templateDefs = nexus_defaults
            defName = "dk"
            break


            case "digital":
            templateDefs = sts_defaults
            defName = "sts"
            break

            default:
            templateDefs = null
            defName = null
            break

        }

        var globalVarsControlDefinition = {}

        globalVars.forEach(function(element, index) {

            var hasDef = templateDefs && templateDefs.globalVars
            var inDef = hasDef && templateDefs.globalVars.hasOwnProperty(element)
            var controlName = inDef ? templateDefs.globalVars[element].name : element
            var controlOptions = inDef ? templateDefs.globalVars[element].options : null


            globalVarsControlDefinition[element] = {
                name: controlName,
                type: controlOptions ? "select" : "text",
                size: "span2",
                class: "globalvar-input " + controlPrefix + element + (controlOptions ? " select-css" : ""),
                options: controlOptions,
                hidden: false,
                readonly: templateDefs && inDef
            }

        })


        extraVars.forEach(function(element, index) {

            var extravarControlDefinition = {}
            var list = element.samplename
            var applyDefForList = element.samplename.toLowerCase().includes(defName)

            if(Object.keys(element.vars).length > 0) {
                for(var key in element.vars) {

                    var extravarName = element.vars[key].name
                    var hasVirtual = virtuals.hasOwnProperty("v" + extravarName)
                    var virtualOptions = hasVirtual ? virtuals["v" + extravarName].children.map(x => ({ name: x.label, value: x.cdata })) : null
                    var hasDef = templateDefs && templateDefs.extraVars
                    var inDef = hasDef && templateDefs.extraVars.hasOwnProperty(extravarName)
                    var defOptions = inDef ? templateDefs.extraVars[extravarName].options : null
    
                    extravarControlDefinition[extravarName] = {
                        name: extravarName,
                        size: "span2",
                        type: virtualOptions || defOptions ? "select" : "text",
                        options: virtualOptions || defOptions,
                        class: "extravar-input " + controlPrefix + extravarName + (virtualOptions || defOptions ? " select-css" : ""),
                        hidden: false,
                        readonly: inDef && templateDefs.extraVars[extravarName].readonly && applyDefForList
                    }
    
                }
    
                var extraVarContent = CreateFormControls(extravarControlDefinition)                
            } else {
                var extraVarContent = $("<p>", { text: "List has no extra variables" }) 
            }

            $(tabHeaders).append(
                $("<li>", {

                })
                .toggleClass("active", index == 0)
                .append($("<a>", {
                    href: "#samplesource_tab_" + index
                }))
            )

            var tabPane = $("<div>", {
                id: "samplesource_tab_" + index,
                class: "tab-pane fade"
            })
            .toggleClass("active in", index == 0)
            .html(extraVarContent)        
            
            slgTabs.append(tabPane)

        })

        var control2 = CreateFormControls(defaultControlDefinition)
        var control3 = CreateFormControls(globalVarsControlDefinition)

        slgContent.append($("<h4>", { text: "Sample Source and Language"}))
        slgContent.append(control2)
        
        if(extraVars.map(x => x.vars).some(x => Object.keys(x).length)) {
            slgContent.append($("<h4>", { text: "Sample Source Variables" }))
            slgContent.append(tabHeaders)
            slgContent.append(slgTabs)  
        }

        if(globalVars) {
            slgContent.append($("<h4>", { text: "Global Variables"}))
            slgContent.append(control3)
        }

        //Bind sample source dropdown
        $(".slg-list").change(function(e) {
            var selectedTemplate = $(".slg-template").val()
            var selectedValue = e.currentTarget.selectedIndex
            var selectedValueName = e.currentTarget.options[selectedValue].text || ""
            $ ("#extravars_tab_headers a").eq(selectedValue).tab("show")

            if(selectedTemplate == "dstar" && selectedValueName.toLowerCase().includes("dk")) {
                var templateDefs = nexus_defaults
                $(".globalvar-input").each(function(index, item) {
                    var inDef = templateDefs && templateDefs.globalVars.hasOwnProperty(item.name)
                    $(item).attr("readonly", !inDef)
                })
            } else if(selectedTemplate == "digital" && selectedValueName.toLowerCase().includes("sts")) {
                var templateDefs = nexus_defaults
                $(".globalvar-input").each(function(index, item) {
                    var inDef = templateDefs && templateDefs.globalVars.hasOwnProperty(item.name)
                    $(item).attr("readonly", !inDef)
                })
            } else {
                $(".globalvar-input").removeAttr("readonly")
            }

        })

    }

    function CreateFormControls(controlDefinition) {

        var row = $("<div>", { class: "row" })
        
        for(var control in controlDefinition) {

            var controlProperties = controlDefinition[control]

            //Create label element
            var label = $("<label>", {
                text: controlProperties["name"],
                class: "control-label"
            })

            switch(controlProperties.type) {
                
                case "select":   
                controlElement = $("<select>", { name: control })
                .addClass(controlProperties["class"])
                .addClass(controlProperties["size"])

                controlProperties["options"].forEach(function(element, value) {
                    controlElement.append($("<option>", {
                        text: element["name"],
                        value: element["value"]
                    }))
                })
                break

                case "text":
                var controlElement = $("<input>", {
                    name: control,
                    type: "text"
                })
                .addClass(controlProperties["class"])
                .addClass(controlProperties["size"])
                break

                default:
                var controlElement = $("<input>", {
                    name: control,
                    type: "text"
                })
                .addClass(controlProperties["class"])
                .addClass(controlProperties["size"])
                break

            }

            controlElement.prop("readonly", controlProperties["readonly"])
            
            controlProperties["attr"] ? controlElement.attr(controlProperties["attr"]) : null

            var controlGroup = $("<div>", {
                "class": "controls " + controlProperties["size"] 
            })
            .toggle(!controlProperties["hidden"])
            .append(label)
            .append(controlElement)
            $(row).append(controlGroup)
        }

        return row
    }
    
    function openHelperDialog(editor, hintText, callback) {
        var template = "<span class='CodeMirror-search-hint'>"
        template += hintText
        template += "</span>"
        template += "<input type='text'/>"
        editor.openDialog(template, callback, {})
    }  
    
    function CreateModalObject(modalId, modalTitle, modalInnerContent, modalButtons) {
        var modal = $("<div>", {
            "id": modalId,
            "class": "modal hide fade",
            "tabindex": "-1",
            "role": "dialog",
            "aria-labelledby": "modalLabel",
            "aria-hidden": "true",
            "data-backdrop": "true"
        })
    
        var modalDialog = $("<div>", {
            "class": "modal-dialog modal-lg",
            "role": "document"
        })
    
        var modalContent = $("<div>", { "class": "modal-content"})
    
        var modalHeader = $("<div>", { "class": "modal-header"})
    
        var modalTitle = $("<h4>", {
            "class": "modal-title",
            "text": modalTitle 
        })
    
        var modalBody = $("<div>", { "class": "modal-body"})
    
        var modalFooter = $("<div>", { "class": "modal-footer"})
    
        modalHeader.append(modalTitle)
        modalBody.append(modalInnerContent)
        modalFooter.append(modalButtons)
        modalContent.append(modalHeader)
        modalContent.append(modalBody)
        modalContent.append(modalFooter)
        modal.append(modalContent)
    
        return modal
    }

    function XmlEditor() {
        var editor = this;
        editor._observer = new Observer();
        editor.$context = $(SELECTORS.container);
        var $textarea = editor.$context.find(SELECTORS.textarea);
        var options = $.extend({
            mode: 'xml',
            smartIndent: false,
            lineNumbers: true,
            keyMap: (function getKeyMap() {
                var qparams = window.location.search ? window.location.search.substring(1).split(',') : [];

                for (var i = 0; i < qparams.length; i++) {
                    var parts = qparams[i].split('=');
                    if (parts[0] === 'mode' && ALT_MODES.indexOf(parts[1]) > -1) {
                        return parts[1];
                    }
                }
                return 'default';
            })(),
            extraKeys: {
                // On Enter copy the indentation from the current line and use it on the next line
                'Enter': function (codeMirror) {
                    // On Enter the current selection is removed
                    if (codeMirror.somethingSelected()) codeMirror.replaceSelection("");
                    var cursorPos = codeMirror.getCursor();
                    var line = codeMirror.getLine(cursorPos.line);
                    // Copy indentation
                    var end = line.search(/[^\s\u00a0]/);
                    if (end === -1) end = line.length;
                    if (cursorPos.ch < end) end = cursorPos.ch;
                    var copy = line.slice(0, end);
                    // Add indentation to new line
                    codeMirror.replaceRange("\n" + copy, cursorPos);
                },
                'Ctrl-Enter': function () {
                    saveBtn.click();
                },
                'Alt-E': function () {
                    showErrors();
                },
                "Ctrl-1": function() { 
                    decipherclips.makeRows() 
                },
                "Ctrl-2": function() { 
                    decipherclips.makeCols() 
                },
                "Ctrl-3": function() { 
                    decipherclips.makeChoices() 
                },
                "Ctrl-4": function() { 
                    decipherclips.makeRowsMatchValues() 
                },
                "Ctrl-5": function() { 
                    decipherclips.makeColsMatchValues() 
                },
                "Ctrl-6": function() { 
                    decipherclips.makeChoicesMatchValues() 
                },
                "Ctrl-7": function() { 
                    decipherclips.addValues() 
                },
                "Ctrl-8": function() { 
                    decipherclips.removeValues() 
                },
                "Alt-1": function() { 
                    decipherclips.makeRowsMatchLabel() 
                },
                "Alt-2": function() { 
                    decipherclips.makeColsMatchLabel() 
                },
                "Alt-3": function() { 
                    decipherclips.makeChoicesMatchLabel() 
                },
                "Shift-Ctrl-1": function() {
                    decipherclips.makeRowsLowToHigh()
                },
                "Shift-Ctrl-2": function() {
                    decipherclips.makeColsLowToHigh()
                },
                "Shift-Ctrl-3": function() {
                    decipherclips.makeChoicesLowToHigh()
                },
                "Shift-Ctrl-4": function() {
                    decipherclips.makeRowsHighToLow()
                },
                "Shift-Ctrl-5": function() {
                    decipherclips.makeColsHighToLow()
                },
                "Shift-Ctrl-6": function() {
                    decipherclips.makeChoicesHighToLow()
                },
                "F1": function() {
                    decipherclips.convertToRows()
                },
                "F2": function() {
                    decipherclips.convertToCols()
                },
                "F3": function() {
                    decipherclips.convertToChoices()
                },
                "Alt-4": function() {
                    decipherclips.makeCases()
                },
                "Ctrl-R": function() { 
                    decipherclips.makeRadio() 
                },
                "Ctrl-E": function() { 
                    decipherclips.makeText() 
                },
                "Ctrl-S": function() { 
                    decipherclips.makeSelect() 
                },
                "Shift-Ctrl-E": function() { 
                    decipherclips.makeTextArea() 
                },
                "Ctrl-Q": function() {
                    decipherclips.makeNumber()  
                },
                "Ctrl-M": function() {
                    decipherclips.makeFloat()
                },
                "Shift-Ctrl-C": function() { 
                    decipherclips.makeCheckbox() 
                },
                "Shift-Ctrl-D": function() {
                    decipherclips.makeDatePicker()
                },
                "Shift-Ctrl-S": function() {
                    decipherclips.makeSliderRating()
                },
                "Shift-Ctrl-G": function() {
                    decipherclips.makeGroups()  
                },
                "Ctrl-B": function() { 
                    openHelperDialog(codemirror, "Enter label for block", function(e) {
                        decipherclips.makeBlock(e)
                    })
                },
                "Ctrl-L": function() { 
                    decipherclips.makeLoop() 
                },
                "Ctrl-I": function() {
                    decipherclips.makeComment()
                },
                "Ctrl-P": function() {
                    openHelperDialog(codemirror, "Enter label", function(e) {
                        decipherclips.makePipe(e)
                    })
                },
                "Ctrl-D": function() {
                    openHelperDialog(codemirror, "Enter label", function(e) {
                        decipherclips.makeDefine(e)
                    })
                },
                "Ctrl-H": function() { 
                    openHelperDialog(codemirror, "Enter label for HTML", function(e) {
                        decipherclips.makeHTML(e)
                    })
                },
                "Alt-G": function() {
                    openHelperDialog(codemirror, "Enter group to assign", function(e) {
                        decipherclips.assignGroup(e)
                    })
                },
                "Alt-R": function() {
                    decipherclips.removeGroup()  
                },
                "Alt-W": function() {
                    openHelperDialog(codemirror, "Enter tag", function(e) {
                        decipherclips.wrapTag(e)
                    })  
                },
                "Alt-S": function() {
                    decipherclips.reverseString()
                }
            }
        });

        var codemirror = CodeMirror.fromTextArea($textarea[0], options);

        var decipherclips = new DecipherClips(codemirror);
        codemirror.setOption("foldGutters", true);
        codemirror.setOption("gutters", ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
        window.codemirror = codemirror
        window.decipherclips = decipherclips

        InitializeSurveyLinkGenerator();
        InitializeAboutDialog();
        InitializeProjectInfoModal();

        editor.fetchData().then(function (content) {

            if (content) {
                $textarea.val(content);
                editor.codemirror = codemirror;
                editor.codemirror.setValue($textarea.val());
                editor.codemirror.on("change", $.proxy(editor.changed, editor));
                editor.addHandlers();
                editor.codemirror.markClean();
            }
            
            showErrors();
            if (lastError) {
                editor._setState(EVENTS.saveFailed);
            }

        });
    }

    $.extend(XmlEditor.prototype, {
        doer: function doer(which, instance) {
            var cm = instance.codemirror;
            var hs = cm.historySize();

            if (hs[which] > 0) {
                cm[which]();
                instance.changed();
            }
        },
        undo: function undo() {
            // undo the last change in CodeMirror
            this.doer('undo', this);
        },
        redo: function redo() {
            // redo the last change in CodeMirror
            this.doer('redo', this);
        },
        save: (function () {
            function success(res) {
                if (!isResponseOk(res)) {
                    return failure.apply(this, arguments);
                }
                this.codemirror.setOption('readOnly', false);
                this.codemirror.markClean();
                this._changed = false;
                this._notification = res.notification ? res.notification : '';
                this._setState(EVENTS.saveSucceeded);
                this._observer.notify(EVENTS.saveSucceeded);
                this._checkUndoRedo();
                this._clearErrorWidgets();
                this.errorState = false;
            }

            function failure(res) {
                var me = this;
                this._clearErrorWidgets();

                if (res.hasOwnProperty('xml')) {
                    this.codemirror.setValue(res.xml);
                }
                this.codemirror.setOption('readOnly', false);
                this._notification = '';
                this._checkUndoRedo();

                // Some errors (ex. 'hermes-eval-errors' in loops) prevent the survey
                // from loading. In these cases, the error message will be displayed
                // with the unexpanded/unclean line number in a dialog.
                if (res.el_errors && res.el_errors.length > 0) {
                    $.each(res.el_errors, function (i, err) {
                        var $widget = $errorWidget.clone();
                        $widget.find('span').text(err[1]);
                        me.errs.push(me.codemirror.addLineWidget(err[0] - 1, $widget[0], {above: true}));

                        // scroll to the first error
                        if (i === 0) {
                            me.codemirror.scrollIntoView(err[0] - 1);
                        }
                    });

                    // trigger failed events, but skip the dialog
                    this._observer.notify(EVENTS.saveFailed, '');
                } else {
                    this._setState(EVENTS.saveFailed);
                    this._observer.notify(EVENTS.saveFailed, res.$info || res.error || 'unknown reason');
                }
                this.errorState = true;
            }

            function isResponseOk(res) {
                // checks if the response has an error indicator
                return !(res.error || res.$error || !res.success);
            }

            function save() {
                var editor = this;
                if (!editor._changed) {
                    var dfd = $.Deferred();
                    dfd.resolve();
                    return dfd.promise();
                }

                editor._setState(EVENTS.saving);
                editor._observer.notify(EVENTS.saving);
                editor.codemirror.setOption('readOnly', 'nocursor');

                var promise = $.hermes('saveRawXml', {
                    path: editor.savePath,
                    xml: editor.codemirror.getValue()
                }, {});

                promise.done($.proxy(success, editor));
                promise.fail($.proxy(failure, editor));

                return promise;
            }

            return save;
        })(),
        _changed: false,
        changed: function changed() {
            this._changed = true;
            this._setState(EVENTS.changed);
            this._observer.notify(EVENTS.changed);
            this._checkUndoRedo();
        },
        _checkUndoRedo: function _checkUndoRedo() {
            // check if there is anything to undo/redo and tells any listeners about it
            var cm = this.codemirror;
            var hs = cm.historySize();

            if (hs.undo > 0) {
                this._observer.notify(EVENTS.undoable);
            } else {
                this._observer.notify(EVENTS.nonUndoable);
            }

            if (hs.redo > 0) {
                this._observer.notify(EVENTS.redoable);
            } else {
                this._observer.notify(EVENTS.nonRedoable);
            }
        },
        _setState: (function () {
            var STATES = {};
            STATES[EVENTS.changed] = CLASSES.changed;
            STATES[EVENTS.saving] = CLASSES.saving;
            STATES[EVENTS.saveSucceeded] = CLASSES.saveSucceeded;
            STATES[EVENTS.saveFailed] = CLASSES.saveFailed;

            // create a space delimited string of all of the classes
            var ALL = $.map(STATES, function (className) {
                return className;
            }).join(' ');

            return function (state) {
                if (!STATES[state]) {
                    return;
                }

                if (this._state !== state) {
                    this.$context.removeClass(ALL).addClass(STATES[state]);
                    this._state = state;
                }
            };
        })(),
        _state: '',
        _notification: '',
        on: function on(evtType, callback) {
            this._observer.subscribe(evtType, callback);
        },
        emit: function emit(evtType) {
            // forces an event type to be emitted
            this._observer.notify(evtType);
        },
        setOption: function setOption(name, value) {
            this.codemirror.setOption(name, value);
        },
        _clearErrorWidgets: function _clearErrorWidgets() {
            var cm = this.codemirror;
            $.each(this.errs, function () {
                cm.removeLineWidget(this);
            });
        },
        errs: [],
        saveAndLaunch: function saveAndLaunch() {
            var editor = this;
            editor.save().then(function () {
                if (editor.savePath && !editor.errorState) {
                    window.LaunchProject(editor.savePath);
                }
            });
        },
        errorState: null,
        fetchData: function () {
            var editor = this;
            return $.hermes('lumos/getSurveyEditorData', {
                path: surveyPath
            }, {}).then(function (res) {
                editor.savePath = res.savePath;
                if (!res.success) {
                    // Indicates an error in the survey.xml
                    lastError = res.error || '';
                }

                window.Heartbeat.init(editor.savePath.replace('selfserve/', ''));
                return res.xml;
            }, function (res) {
                // Indicates an error in the processing of the request
                lastError = res && (res.$info || res.$error) || res;
                isReadOnly = true;
                return $.Deferred().resolve('');
            });
        },
        _lastSavedVersion: null,
        setLastSavedVersion: function () {
            this._lastSavedVersion = this.codemirror.getValue();
        },
        getLastSavedVersion: function () {
            return this._lastSavedVersion;
        },
        resetToLastSavedVersion: function () {
            this.codemirror.setValue(this._lastSavedVersion);
            this.emit(EVENTS.changed);
        },
        addHandlers: function () {
            var editor = this;

            saveBtn.click($.proxy(editor.save, editor));

            testSurveyBtn.click(function () {
                var handler = function () {
                    window.open("/survey/" + surveyPath, "xmleditor_testsurvey");
                };
                if (isReadOnly) {
                    handler();
                } else {
                    editor.save().done(handler);
                }
            });

            // Initialize xmleditor menus
            initializeActionsMenu(editor);
            initializeViewOptionsMenu(editor);

            //Fix launch
            $("#gh-launch-survey-button").removeAttr("onclick")
            $("#gh-launch-survey-button").on("click", function(e) {
                editor.saveAndLaunch()
            })            
            var Growler = (function () {
                // performs the notifications

                var notify = (function () {
                    // make all notification go through here, so we can easily
                    // change libraries

                    // NOTIFIER: toastr
                    var OPTIONS = {
                        positionClass: 'toast-bottom-right'
                    };

                    var FN_MAP = {
                        info: 'info',
                        success: 'success',
                        error: 'error',
                        warn: 'warning'
                    };

                    return function notify(type, message, o) {
                        var fn = toastr[FN_MAP[type]];
                        if (o) {
                            o = $.extend({}, OPTIONS, o || {});
                        } else {
                            o = OPTIONS;
                        }

                        fn('', message, o);
                    };
                })();

                return {
                    saveSucceeded: function onSaveSucceeded() {
                        $(SELECTORS.savingModal).modal('hide');
                        if (editor._notification) {
                            notify('success', editor._notification);
                        } else {
                            notify('success', 'Save completed');
                        }
                    },
                    saveFailed: function onSaveFailed() {
                        $(SELECTORS.savingModal).modal('hide');
                        notify('error', 'Save failed');
                    }
                };
            })();

            // this is NOT the jQuery .on() method
            editor.on(EVENTS.saving, function (msg) {
                $(SELECTORS.savingModal).modal({backdrop: 'static'});
            });
            editor.on(EVENTS.saveFailed, function (msg) {
                lastError = $.isArray(msg) ? msg.join("<br />\n") : msg;
                showErrors();
            });
            editor.on(EVENTS.saveSucceeded, function () {
                lastError = null;
                editor.setLastSavedVersion();
            });

            editor.on(EVENTS.undoable, function () {
                undoBtn.enable();
            });
            editor.on(EVENTS.nonUndoable, function () {
                undoBtn.disable();
            });
            editor.on(EVENTS.redoable, function () {
                redoBtn.enable();
            });
            editor.on(EVENTS.nonRedoable, function () {
                redoBtn.disable();
            });

            // jQuery .on() events
            $(SELECTORS.undoButton).on('click', function () {
                editor.undo();
            });
            $(SELECTORS.redoButton).on('click', function () {
                editor.redo();
            });

            Tipped.create($(SELECTORS.undoButton), _('Undo') + ' (ctrl+z)', {skin: 'rs'});
            Tipped.create($(SELECTORS.redoButton), _('Redo') + ' (ctrl+shift+z)', {skin: 'rs'});

            editor.setLastSavedVersion();

            // save
            if (!isReadOnly) {
                editor.on(EVENTS.changed, $.proxy(saveBtn.enable, saveBtn));
            }
            editor.on(EVENTS.saving, $.proxy(saveBtn.disable, saveBtn));

            // growler
            editor.on(EVENTS.saveSucceeded, Growler.saveSucceeded);
            editor.on(EVENTS.saveFailed, Growler.saveFailed);

            // bind certain keys so they happen even when focus is outside of the
            // text editor
            var shortcutBindings = {
                'ctrl+z': function () {
                    editor.undo();
                },
                'ctrl+shift+z': function () {
                    editor.redo();
                },
                'ctrl+enter': function () {
                    saveBtn.click();
                },
                'ctrl+shift+1': function () {
                    showErrors();
                },
                'ctrl+f': function () {
                    CodeMirror.commands.find(editor.codemirror);
                },
                'ctrl+g': function () {
                    CodeMirror.commands.findNext(editor.codemirror);
                },
                'ctrl+shift+g': function () {
                    CodeMirror.commands.findPrev(editor.codemirror);
                },
                'ctrl+shift+f': function () {
                    CodeMirror.commands.replace(editor.codemirror);
                },
                'ctrl+shift+r': function () {
                    CodeMirror.commands.replaceAll(editor.codemirror);
                },
                'f9': function() {
                    var menuHidden = $("#gh-navigation-menus").hasClass("top-menu-hidden")
                    if(!menuHidden) {
                        $("#fv-nav").hide()
                        $(".gh-secondary-navigation").hide()
                        $("#gh-navigation-menus").toggleClass("top-menu-hidden", true)
                    } else {
                        $("#fv-nav").show()
                        $(".gh-secondary-navigation").show() 
                        $("#gh-navigation-menus").toggleClass("top-menu-hidden", false)
                    }
                    resizeCodeMirror(editor, $(window));
                }
            };

            $.each(shortcutBindings, function (keys, fn) {
                Mousetrap.bind(keys, fn);
            });

            if (!isReadOnly) {
                // Alert user when leaving the xml editor without saving changes
                $(window).bind('beforeunload', function () {
                    // Some browsers allow us to customize the message,
                    // others will ignore it and use their own native message
                    var msg = "You have attempted to leave this page. If you have made any changes to the XML without saving, your changes will be lost. Are you sure you want to exit this page?";

                    if (!editor.codemirror.isClean()) {
                        return msg;
                    }
                });
            }

            resizeCodeMirror(editor, $(window));
            $(window).resize(function () {
                resizeCodeMirror(editor, $(this));
            }); // resize CodeMirror editor any time the window changes size
        }
    });

    function initializeActionsMenu(editor) {
        $('li.nav-actionsMenu').dui_dropMenu({
            closeOnClickOut: true,
            init: function (menu) {
                function isEnabledWrapper(action) {
                    return function () {
                        return !$.isFunction(action.cond) || action.cond();
                    };
                }

                var actions = [{
                    className: CLASSES.openFile,
                    text: 'Open File',
                    subText: '',
                    cond: function () {
                        if (isReadOnly) {
                            return false; // disable saving in VIEW mode
                        }
                        return true;
                    },
                    handler: function() {
                        
                        var fileInput = $(".open-file-input")

                        $(fileInput).change(function(e) {
                            var file = event.target.files[0];
                            var fileReader = new FileReader();
                            if(/.*?\.(?:txt|xml)$/.test(file.name)) {
                                fileReader.onload = function(event) {
                                    editor.codemirror.setValue(event.target.result);
                                }
                                fileReader.readAsText(file)
                            } else {
                                alert("You have selected an invalid file");
                            }
                            $(e.currentTarget).off();
                        });

                        fileInput.click();
                    }
                }, {
                    className: CLASSES.save,
                    text: 'Save',
                    subText: ' (ctrl+enter)',
                    cond: function () {
                        if (isReadOnly) {
                            return false; // disable saving in VIEW mode
                        }
                        return true;
                    },
                    handler: function () {
                        editor.save();
                    }
                }, {
                    className: CLASSES.saveFile,
                    text: 'Save to File',
                    subText: '',
                    handler: function() {
                        var fileAttributes = {
                            "href": makeFile(editor.codemirror.getValue()),
                            "download": $(".gh-survey-name").attr("title") + ".xml"
                        };
                        $(".save-file-link").attr(fileAttributes).get(0).click();
                    }
                }, {
                    className: CLASSES.reset,
                    text: 'Revert to Last Save',
                    subText: '',
                    cond: function () {
                        return editor.codemirror.getValue() !== editor.getLastSavedVersion();
                    },
                    handler: function () {
                        editor.resetToLastSavedVersion();
                    }
                }];

                $.each(actions, function (_, action) {
                    var handler = action.handler;
                    action.handler = function () {
                        handler.apply(this, arguments);
                        menu.close();
                    };
                    action.isEnabled = isEnabledWrapper(action);
                });

                return Templates.get('actionsMenu', actions);
            },
            insertWhere: '.nav-actionsMenu:first'
        });


        var editMenu = $("<li>", {
            "class": "link submenu-link hadNav nav-editMenu clickable pl-4 pb-0"
        })
        .append(
            $("<a>", {
                "class": "icon-dropdown m-0"
            })
            .append(
                $("<i>", {
                    "class": "fa fa-edit"
                })
            )
            .append(" &nbsp; Edit &nbsp;")
            .append(
                $("<i>", {
                    "class": "fa fa-caret-down"
                })
            )
        )        

        $("li.nav-actionsMenu").after(editMenu)
        .html(
            $("<a>", {
                "class": "icon-dropdown m-0"
            })
            .append(
                $("<i>", {
                    "class": "fa fa-folder"
                })
                )
            .append(" &nbsp;File &nbsp;")
            .append(
                $("<i>", {
                    "class": "fa fa-caret-down"
                })
            )
        );

        $("li.undo-command").remove();
        $("li.redo-command").remove();

        editMenu.dui_dropMenu({
            closeOnClickOut: true,
            init: function (menu) {
                function isEnabledWrapper(action) {
                    return function () {
                        return !$.isFunction(action.cond) || action.cond();
                    };
                }

                var actions = [{
                    className: CLASSES.undo,
                    text: 'Undo',
                    subText: ' (ctrl+z)',
                    handler: function () {
                        editor.codemirror.undo()
                    }
                },{
                    className: CLASSES.redo,
                    text: 'Redo',
                    subText: ' (ctrl+y)',
                    handler: function () {
                        editor.codemirror.redo()
                    }
                },{
                    className: CLASSES.find,
                    text: 'Find',
                    subText: ' (ctrl+f)',
                    handler: function () {
                        CodeMirror.commands.find(editor.codemirror);
                    }
                }, {
                    className: CLASSES.findNext,
                    text: 'Find Next',
                    subText: ' (ctrl+g)',
                    handler: function () {
                        CodeMirror.commands.findNext(editor.codemirror);
                    }
                }, {
                    className: CLASSES.findPrevious,
                    text: 'Find Previous',
                    subText: ' (ctrl+shift+g)',
                    handler: function () {
                        CodeMirror.commands.findPrev(editor.codemirror);
                    }
                }, {
                    className: CLASSES.replace,
                    text: 'Replace',
                    subText: ' (ctrl+shift+f)',
                    handler: function () {
                        CodeMirror.commands.replace(editor.codemirror);
                    }
                }, {
                    className: CLASSES.replaceAll,
                    text: 'Replace All',
                    subText: ' (ctrl+shift+r)',
                    handler: function () {
                        CodeMirror.commands.replaceAll(editor.codemirror);
                    }
                }];

                $.each(actions, function (_, action) {
                    var handler = action.handler;
                    action.handler = function () {
                        handler.apply(this, arguments);
                        menu.close();
                    };
                    action.isEnabled = isEnabledWrapper(action);
                });

                return Templates.get('actionsMenu', actions);
            },
            insertWhere: '.nav-editMenu:first'
        });

        //Append hidden elements
        $("#topToolBar").append(
            $("<input>", {
                "class": "open-file-input",
                "type": "file"
            })
            .css("display", "none")
        )
        .append(
            $("<a>", {
                "class": "save-file-link"
            })
            .css("display", "none")
        );
    }

    function initializeViewOptionsMenu(editor) {
        $('li.viewOptions').dui_dropMenu({
            closeOnClickOut: true,
            init: function (menu) {
                function isEnabledWrapper(action) {
                    return function () {
                        return !$.isFunction(action.cond) || action.cond();
                    };
                }

                var actions = [
                    {
                        className: CLASSES.errors,
                        text: 'Errors',
                        subText: ' (Alt+E)',
                        cond: function () {
                            return !!lastError;
                        },
                        handler: function () {
                            showErrors();
                        }
                    }, {
                        className: ".hide-top-menu",
                        text: "Hide Top Menu",
                        subText: "",
                        handler: function() {
                            var menuHidden = $("#gh-navigation-menus").hasClass("top-menu-hidden")
                            if(!menuHidden) {
                                $("#fv-nav").hide()
                                $(".gh-secondary-navigation").hide()
                                $("#gh-navigation-menus").toggleClass("top-menu-hidden", true)
                            } else {
                                $("#fv-nav").show()
                                $(".gh-secondary-navigation").show() 
                                $("#gh-navigation-menus").toggleClass("top-menu-hidden", false)
                            }
                            resizeCodeMirror(editor, $(window));
                        }
                    }
                ];

                $.each(actions, function (_, action) {
                    var handler = action.handler;
                    action.handler = function () {
                        handler.apply(this, arguments);
                        menu.close();
                    };
                    action.isEnabled = isEnabledWrapper(action);
                });

                return Templates.get('actionsMenu', actions);
            },
            insertWhere: '#view-menu .viewOptions:first'
        });

        $("li.viewOptions").html(
            $("<a>", {
                "class": "icon-dropdown m-0"
            })
            .append(
                $("<i>", {
                    "class": "fa fa-eye"
                })
                )
            .append(" &nbsp;View &nbsp;")
            .append(
                $("<i>", {
                    "class": "fa fa-caret-down"
                })
            )
        )

        var toolsMenu = $("<li>", {
            "class": "link submenu-link hadNav nav-toolsMenu clickable pl-4 pb-0"
        }) 
        .append(
            $("<a>", {
                "class": "icon-dropdown m-0"
            })
            .append(
                $("<i>", {
                    "class": "fa fa-gear"
                })
            )
            .append(" &nbsp;Tools &nbsp;")
            .append(
                $("<i>", {
                    "class": "fa fa-caret-down"
                })
            )
        )   

        $("li.viewOptions").after(toolsMenu);

        toolsMenu.dui_dropMenu({
            closeOnClickOut: true,
            init: function (menu) {
                function isEnabledWrapper(action) {
                    return function () {
                        return !$.isFunction(action.cond) || action.cond();
                    };
                }

                var actions = [{
                    className: CLASSES.slg,
                    text: "Generate link (beta)",
                    subText: "",
                    handler: function() {
                        TakeSurvey.helpers.getData(surveyPath).done(function(response) {
                            $("#slg-modal").find(".slg-extras").empty()
                            LoadSurveyLinkSources(response)
                            $("#slg-modal").modal()
                        })
                    }
                },{
                    className: CLASSES.settings,
                    text: "Preferences",
                    subText: "",
                    handler: function() {
                        $ ("#settingsModal").modal();
                    }
                }];

                $.each(actions, function (_, action) {
                    var handler = action.handler;
                    action.handler = function () {
                        handler.apply(this, arguments);
                        menu.close();
                    };
                    action.isEnabled = isEnabledWrapper(action);
                });

                return Templates.get('actionsMenu', actions);
            },
            insertWhere: '.nav-toolsMenu:first'
        });    

        var helpMenu = $("<li>", {
            "class": "link submenu-link hadNav nav-helpMenu clickable pl-4 pb-0"
        })
        .append(
            $("<a>", {
                "class": "icon-dropdown m-0"
            })
            .append(
                $("<i>", {
                    "class": "fa fa-question-circle"
                })
            )
            .append(" &nbsp;Help &nbsp;")
            .append(
                $("<i>", {
                    "class": "fa fa-caret-down"
                })
            )
        ) 

        $(".nav-toolsMenu").after(helpMenu);

        helpMenu.dui_dropMenu({
            closeOnClickOut: true,
            init: function (menu) {
                function isEnabledWrapper(action) {
                    return function () {
                        return !$.isFunction(action.cond) || action.cond();
                    };
                }

                var actions = [{
                    className: CLASSES.help,
                    text: 'Open Guide',
                    subText: '',
                    handler: function () {
                        $("#helpModal").modal()
                    }
                },{
                    className: CLASSES.projectinfo,
                    text: 'Project Info',
                    subText: '',
                    handler: function () {
                        $("#projectinfo-modal").modal()
                    }
                }, {
                    className: CLASSES.about,
                    text: 'About',
                    subText: '',
                    handler: function () {
                        $("#about-modal").modal()
                    }
                }];

                $.each(actions, function (_, action) {
                    var handler = action.handler;
                    action.handler = function () {
                        handler.apply(this, arguments);
                        menu.close();
                    };
                    action.isEnabled = isEnabledWrapper(action);
                });

                return Templates.get('actionsMenu', actions);
            },
            insertWhere: '.nav-helpMenu:first'
        });        
    }

    function makeFile(text) {
        var textFile=null
        var data = new Blob([text], {type: 'text/plain'});
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
    }

    function resizeCodeMirror(editor, $container) {
        // resizes the CodeMirror editor so that it fills the container
        var containerHeight = $container.height() - $('#fwheader').height() - $('.dux-control-bar-bottom').outerHeight();
        var cmHeight = editor.$context.find('.CodeMirror').height();
        var gutter = editor.$context.outerHeight(true) - cmHeight;

        editor.codemirror.setSize(null, containerHeight - gutter);
    }

    window.editor = new XmlEditor();

})();