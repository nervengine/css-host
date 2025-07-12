from tkinter import *
import re

#==================================================
# FUNCTION DEFINITIONS
#==================================================
def questionGenerate(textarea):
	outputString = ""
	
	# Generic radio question
	if var_questionGeneratorValue.get() == lst_questionGeneratorOptions[0]:
		outputString += "<radio label=\"Q#\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "[Insert your question's rows/columns here]\n"
		outputString += "</radio>"
		
	# Generic checkbox question
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[1]:
		outputString += "<checkbox label=\"Q#\" atleast=\"1\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "[Insert your question's rows/columns here]\n"
		outputString += "</checkbox>"
		
	# Generic select question
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[2]:
		outputString += "<select label=\"Q#\" optional=\"0\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "[Insert your question's rows/columns/choices here]\n"
		outputString += "</select>"
		
	# Generic number question
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[3]:
		outputString += "<number label=\"Q#\" optional=\"0\" size=\"#\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "[Insert your question's rows/columns here, if any]\n"
		outputString += "</number>"
		
	# Generic text question
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[4]:
		outputString += "<text label=\"Q#\" optional=\"0\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "[Insert your question's rows/columns here, if any]\n"
		outputString += "</text>"
		
	# Generic textarea question
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[5]:
		outputString += "<textarea label=\"Q#\" optional=\"0\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "[Insert your question's rows/columns here, if any]\n"
		outputString += "</textarea>"
		
	# HTML element
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[6]:
		outputString += "<html label=\"#\">\n"
		outputString += "[Place HTML content here]\n"
		outputString += "</html>"
		
	# Radio question: Yes/No
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[7]:
		outputString += "<radio label=\"Q#\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "<row label=\"r1\">Yes</row>\n"
		outputString += "<row label=\"r2\">No</row>\n"
		outputString += "</radio>"
		
	# Radio question: Gender
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[8]:
		outputString += "<radio label=\"Q#\">\n"
		outputString += "<title>What is your gender?</title>\n"
		outputString += "<row label=\"r1\">Male</row>\n"
		outputString += "<row label=\"r2\">Female</row>\n"
		outputString += "</radio>"
		
	# Radio question: Age
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[9]:
		outputString += "<radio label=\"Q#\">\n"
		outputString += "<title>Which of the following age groups are you in?</title>\n"
		outputString += "<row label=\"r1\">Under 18</row>\n"
		outputString += "<row label=\"r2\">18-24</row>\n"
		outputString += "<row label=\"r3\">25-34</row>\n"
		outputString += "<row label=\"r4\">35-44</row>\n"
		outputString += "<row label=\"r5\">45-54</row>\n"
		outputString += "<row label=\"r6\">55-64</row>\n"
		outputString += "<row label=\"r7\">65 or older</row>\n"
		outputString += "</radio>"
		
	# Radio question: Income
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[10]:
		outputString += "<radio label=\"Q#\">\n"
		outputString += "<title>Which of the following best describes your annual income?</title>\n"
		outputString += "<row label=\"r1\">Less than $25,000</row>\n"
		outputString += "<row label=\"r2\">$25,000 - $49,999</row>\n"
		outputString += "<row label=\"r3\">$50,000 - $74,999</row>\n"
		outputString += "<row label=\"r4\">$75,000 - $99,999</row>\n"
		outputString += "<row label=\"r5\">$100,000 - $149,999</row>\n"
		outputString += "<row label=\"r6\">$150,000 - $199,999</row>\n"
		outputString += "<row label=\"r7\">$200,000 or more</row>\n"
		outputString += "<row label=\"r8\">Prefer not to answer</row>\n"
		outputString += "</radio>"
		
	# Radio question: Ethnicity
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[11]:
		outputString += "<radio label=\"Q#\">\n"
		outputString += "<title>Which of the following best describes your ethnicity?</title>\n"
		outputString += "<row label=\"r1\">White or Caucasian</row>\n"
		outputString += "<row label=\"r2\">Black or African American</row>\n"
		outputString += "<row label=\"r3\">Asian</row>\n"
		outputString += "<row label=\"r4\">American Indian, Alaska Native, Native Hawaiian or other Pacific Islander</row>\n"
		outputString += "<row label=\"r5\">Some other ethnicity</row>\n"
		outputString += "<row label=\"r6\">Prefer not to answer</row>\n"
		outputString += "</radio>"
		
	# Radio question: US State
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[12]:
		outputString += "<radio label=\"Q#\">\n"
		outputString += "<title>In which state do you reside?</title>\n"
		outputString += "<row label=\"rAL\">Alabama</row>\n"
		outputString += "<row label=\"rAK\">Alaska</row>\n"
		outputString += "<row label=\"rAZ\">Arizona</row>\n"
		outputString += "<row label=\"rAR\">Arkansas</row>\n"
		outputString += "<row label=\"rCA\">California</row>\n"
		outputString += "<row label=\"rCO\">Colorado</row>\n"
		outputString += "<row label=\"rCT\">Connecticut</row>\n"
		outputString += "<row label=\"rDE\">Delaware</row>\n"
		outputString += "<row label=\"rDC\">District of Columbia</row>\n"
		outputString += "<row label=\"rFL\">Florida</row>\n"
		outputString += "<row label=\"rGA\">Georgia</row>\n"
		outputString += "<row label=\"rHI\">Hawaii</row>\n"
		outputString += "<row label=\"rID\">Idaho</row>\n"
		outputString += "<row label=\"rIL\">Illinois</row>\n"
		outputString += "<row label=\"rIN\">Indiana</row>\n"
		outputString += "<row label=\"rIA\">Iowa</row>\n"
		outputString += "<row label=\"rKS\">Kansas</row>\n"
		outputString += "<row label=\"rKY\">Kentucky</row>\n"
		outputString += "<row label=\"rLA\">Louisiana</row>\n"
		outputString += "<row label=\"rME\">Maine</row>\n"
		outputString += "<row label=\"rMD\">Maryland</row>\n"
		outputString += "<row label=\"rMA\">Massachusetts</row>\n"
		outputString += "<row label=\"rMI\">Michigan</row>\n"
		outputString += "<row label=\"rMN\">Minnesota</row>\n"
		outputString += "<row label=\"rMS\">Mississippi</row>\n"
		outputString += "<row label=\"rMO\">Missouri</row>\n"
		outputString += "<row label=\"rMT\">Montana</row>\n"
		outputString += "<row label=\"rNE\">Nebraska</row>\n"
		outputString += "<row label=\"rNV\">Nevada</row>\n"
		outputString += "<row label=\"rNH\">New Hampshire</row>\n"
		outputString += "<row label=\"rNJ\">New Jersey</row>\n"
		outputString += "<row label=\"rNM\">New Mexico</row>\n"
		outputString += "<row label=\"rNY\">New York</row>\n"
		outputString += "<row label=\"rNC\">North Carolina</row>\n"
		outputString += "<row label=\"rND\">North Dakota</row>\n"
		outputString += "<row label=\"rOH\">Ohio</row>\n"
		outputString += "<row label=\"rOK\">Oklahoma</row>\n"
		outputString += "<row label=\"rOR\">Oregon</row>\n"
		outputString += "<row label=\"rPA\">Pennsylvania</row>\n"
		outputString += "<row label=\"rRI\">Rhode Island</row>\n"
		outputString += "<row label=\"rSC\">South Carolina</row>\n"
		outputString += "<row label=\"rSD\">South Dakota</row>\n"
		outputString += "<row label=\"rTN\">Tennessee</row>\n"
		outputString += "<row label=\"rTX\">Texas</row>\n"
		outputString += "<row label=\"rUT\">Utah</row>\n"
		outputString += "<row label=\"rVT\">Vermont</row>\n"
		outputString += "<row label=\"rVA\">Virginia</row>\n"
		outputString += "<row label=\"rWA\">Washington</row>\n"
		outputString += "<row label=\"rWV\">West Virginia</row>\n"
		outputString += "<row label=\"rWI\">Wisconsin</row>\n"
		outputString += "<row label=\"rWY\">Wyoming</row>\n"
		outputString += "</radio>"
		
	# Radio question: US state with region punch
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[13]:
		outputString += "<radio label=\"Q#\">\n"
		outputString += "<title>In which state do you reside?</title>\n"
		outputString += "<row label=\"rAL\">Alabama</row>\n"
		outputString += "<row label=\"rAK\">Alaska</row>\n"
		outputString += "<row label=\"rAZ\">Arizona</row>\n"
		outputString += "<row label=\"rAR\">Arkansas</row>\n"
		outputString += "<row label=\"rCA\">California</row>\n"
		outputString += "<row label=\"rCO\">Colorado</row>\n"
		outputString += "<row label=\"rCT\">Connecticut</row>\n"
		outputString += "<row label=\"rDE\">Delaware</row>\n"
		outputString += "<row label=\"rDC\">District of Columbia</row>\n"
		outputString += "<row label=\"rFL\">Florida</row>\n"
		outputString += "<row label=\"rGA\">Georgia</row>\n"
		outputString += "<row label=\"rHI\">Hawaii</row>\n"
		outputString += "<row label=\"rID\">Idaho</row>\n"
		outputString += "<row label=\"rIL\">Illinois</row>\n"
		outputString += "<row label=\"rIN\">Indiana</row>\n"
		outputString += "<row label=\"rIA\">Iowa</row>\n"
		outputString += "<row label=\"rKS\">Kansas</row>\n"
		outputString += "<row label=\"rKY\">Kentucky</row>\n"
		outputString += "<row label=\"rLA\">Louisiana</row>\n"
		outputString += "<row label=\"rME\">Maine</row>\n"
		outputString += "<row label=\"rMD\">Maryland</row>\n"
		outputString += "<row label=\"rMA\">Massachusetts</row>\n"
		outputString += "<row label=\"rMI\">Michigan</row>\n"
		outputString += "<row label=\"rMN\">Minnesota</row>\n"
		outputString += "<row label=\"rMS\">Mississippi</row>\n"
		outputString += "<row label=\"rMO\">Missouri</row>\n"
		outputString += "<row label=\"rMT\">Montana</row>\n"
		outputString += "<row label=\"rNE\">Nebraska</row>\n"
		outputString += "<row label=\"rNV\">Nevada</row>\n"
		outputString += "<row label=\"rNH\">New Hampshire</row>\n"
		outputString += "<row label=\"rNJ\">New Jersey</row>\n"
		outputString += "<row label=\"rNM\">New Mexico</row>\n"
		outputString += "<row label=\"rNY\">New York</row>\n"
		outputString += "<row label=\"rNC\">North Carolina</row>\n"
		outputString += "<row label=\"rND\">North Dakota</row>\n"
		outputString += "<row label=\"rOH\">Ohio</row>\n"
		outputString += "<row label=\"rOK\">Oklahoma</row>\n"
		outputString += "<row label=\"rOR\">Oregon</row>\n"
		outputString += "<row label=\"rPA\">Pennsylvania</row>\n"
		outputString += "<row label=\"rRI\">Rhode Island</row>\n"
		outputString += "<row label=\"rSC\">South Carolina</row>\n"
		outputString += "<row label=\"rSD\">South Dakota</row>\n"
		outputString += "<row label=\"rTN\">Tennessee</row>\n"
		outputString += "<row label=\"rTX\">Texas</row>\n"
		outputString += "<row label=\"rUT\">Utah</row>\n"
		outputString += "<row label=\"rVT\">Vermont</row>\n"
		outputString += "<row label=\"rVA\">Virginia</row>\n"
		outputString += "<row label=\"rWA\">Washington</row>\n"
		outputString += "<row label=\"rWV\">West Virginia</row>\n"
		outputString += "<row label=\"rWI\">Wisconsin</row>\n"
		outputString += "<row label=\"rWY\">Wyoming</row>\n"
		outputString += "</radio>\n\n"
		outputString += "<suspend/>\n\n"
		outputString += "<exec>\n"
		outputString += "myState = Q#.selected.label[-2:]\n\n"
		outputString += "if myState in [\"CT\", \"ME\", \"MA\", \"NH\", \"NJ\", \"NY\", \"PA\", \"RI\", \"VT\"]:\n"
		outputString += "\tHP_region4.val = HP_region4.r1.index\n"
		outputString += "elif myState in [\"IL\", \"IN\", \"MI\", \"OH\", \"WI\", \"IA\", \"KS\", \"MN\", \"MO\", \"NE\", \"ND\", \"SD\"]:\n"
		outputString += "\tHP_region4.val = HP_region4.r2.index\n"
		outputString += "elif myState in [\"DE\", \"FL\", \"GA\", \"MD\", \"NC\", \"SC\", \"VA\", \"DC\", \"WV\", \"AL\", \"KY\", \"MS\", \"TN\", \"AR\", \"LA\", \"OK\", \"TX\"]:\n"
		outputString += "\tHP_region4.val = HP_region4.r3.index\n"
		outputString += "elif myState in [\"AZ\", \"CO\", \"ID\", \"MT\", \"NV\", \"NM\", \"UT\", \"WY\", \"AK\", \"CA\", \"HI\", \"OR\", \"WA\"]:\n"
		outputString += "\tHP_region4.val = HP_region4.r4.index\n\n"
		outputString += "if myState in [\"WA\", \"OR\", \"CA\", \"AK\", \"HI\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r1.index\n"
		outputString += "elif myState in [\"MT\", \"ID\", \"WY\", \"CO\", \"UT\", \"NV\", \"AZ\", \"NM\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r2.index\n"
		outputString += "elif myState in [\"ND\", \"MN\", \"SD\", \"NB\", \"IA\", \"KS\", \"MO\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r3.index\n"
		outputString += "elif myState in [\"OK\", \"AR\", \"TX\", \"LA\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r4.index\n"
		outputString += "elif myState in [\"MI\", \"WI\", \"IN\", \"IL\", \"OH\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r5.index\n"
		outputString += "elif myState in [\"KY\", \"TN\", \"MS\", \"AL\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r6.index\n"
		outputString += "elif myState in [\"ME\", \"NH\", \"VT\", \"MA\", \"CT\", \"RI\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r7.index\n"
		outputString += "elif myState in [\"NY\", \"PA\", \"NJ\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r8.index\n"
		outputString += "elif myState in [\"WV\", \"MD\", \"DE\", \"DC\", \"VA\", \"NC\", \"SC\", \"GA\", \"FL\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r9.index\n"
		outputString += "</exec>\n\n"
		outputString += "<radio label=\"HP_region4\" where=\"execute,survey,report\">\n"
		outputString += "<title>Hidden Question.  Region4</title>\n"
		outputString += "<row label=\"r1\">Northeast</row>\n"
		outputString += "<row label=\"r2\">Midwest</row>\n"
		outputString += "<row label=\"r3\">South</row>\n"
		outputString += "<row label=\"r4\">West</row>\n"
		outputString += "</radio>\n\n"
		outputString += "<radio label=\"HP_region9\" where=\"execute,survey,report\">\n"
		outputString += "<title>Hidden Question.  Region9</title>\n"
		outputString += "<row label=\"r1\">Pacific</row>\n"
		outputString += "<row label=\"r2\">Mountain</row>\n"
		outputString += "<row label=\"r3\">West North Central</row>\n"
		outputString += "<row label=\"r4\">West South Central</row>\n"
		outputString += "<row label=\"r5\">East North Central</row>\n"
		outputString += "<row label=\"r6\">East South Central</row>\n"
		outputString += "<row label=\"r7\">New England</row>\n"
		outputString += "<row label=\"r8\">Mid Atlantic</row>\n"
		outputString += "<row label=\"r9\">South Atlantic</row>\n"
		outputString += "</radio>"
	
	# Radio question: 0-5 scale
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[14]:
		outputString += "<radio label=\"Q#\" type=\"rating\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "<col label=\"c0\" value=\"0\">Left Extreme<br/>0</col>\n"
		outputString += "<col label=\"c1\" value=\"1\">1</col>\n"
		outputString += "<col label=\"c2\" value=\"2\">2</col>\n"
		outputString += "<col label=\"c3\" value=\"3\">3</col>\n"
		outputString += "<col label=\"c4\" value=\"4\">4</col>\n"
		outputString += "<col label=\"c5\" value=\"5\">Right Extreme<br/>5</col>\n"
		outputString += "</radio>"
		
	# Radio question: 1-5 scale
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[15]:
		outputString += "<radio label=\"Q#\" type=\"rating\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "<col label=\"c1\" value=\"1\">Left Extreme<br/>1</col>\n"
		outputString += "<col label=\"c2\" value=\"2\">2</col>\n"
		outputString += "<col label=\"c3\" value=\"3\">3</col>\n"
		outputString += "<col label=\"c4\" value=\"4\">4</col>\n"
		outputString += "<col label=\"c5\" value=\"5\">Right Extreme<br/>5</col>\n"
		outputString += "</radio>"
		
	# Radio question: 0-7 scale
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[16]:
		outputString += "<radio label=\"Q#\" type=\"rating\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "<col label=\"c0\" value=\"0\">Left Extreme<br/>0</col>\n"
		outputString += "<col label=\"c1\" value=\"1\">1</col>\n"
		outputString += "<col label=\"c2\" value=\"2\">2</col>\n"
		outputString += "<col label=\"c3\" value=\"3\">3</col>\n"
		outputString += "<col label=\"c4\" value=\"4\">4</col>\n"
		outputString += "<col label=\"c5\" value=\"5\">5</col>\n"
		outputString += "<col label=\"c6\" value=\"6\">6</col>\n"
		outputString += "<col label=\"c7\" value=\"7\">Right Extreme<br/>7</col>\n"
		outputString += "</radio>"
		
	# Radio question: 1-7 scale
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[17]:
		outputString += "<radio label=\"Q#\" type=\"rating\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "<col label=\"c1\" value=\"1\">Left Extreme<br/>1</col>\n"
		outputString += "<col label=\"c2\" value=\"2\">2</col>\n"
		outputString += "<col label=\"c3\" value=\"3\">3</col>\n"
		outputString += "<col label=\"c4\" value=\"4\">4</col>\n"
		outputString += "<col label=\"c5\" value=\"5\">5</col>\n"
		outputString += "<col label=\"c6\" value=\"6\">6</col>\n"
		outputString += "<col label=\"c7\" value=\"7\">Right Extreme<br/>7</col>\n"
		outputString += "</radio>"
		
	# Radio question: 0-10 scale
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[18]:
		outputString += "<radio label=\"Q#\" type=\"rating\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "<col label=\"c0\" value=\"0\">Left Extreme<br/>0</col>\n"
		outputString += "<col label=\"c1\" value=\"1\">1</col>\n"
		outputString += "<col label=\"c2\" value=\"2\">2</col>\n"
		outputString += "<col label=\"c3\" value=\"3\">3</col>\n"
		outputString += "<col label=\"c4\" value=\"4\">4</col>\n"
		outputString += "<col label=\"c5\" value=\"5\">5</col>\n"
		outputString += "<col label=\"c6\" value=\"6\">6</col>\n"
		outputString += "<col label=\"c7\" value=\"7\">7</col>\n"
		outputString += "<col label=\"c8\" value=\"8\">8</col>\n"
		outputString += "<col label=\"c9\" value=\"9\">9</col>\n"
		outputString += "<col label=\"c10\" value=\"10\">Right Extreme<br/>10</col>\n"
		outputString += "</radio>"
		
	# Radio question: 1-10 scale
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[19]:
		outputString += "<radio label=\"Q#\" type=\"rating\">\n"
		outputString += "<title>Question Title</title>\n"
		outputString += "<col label=\"c1\" value=\"1\">Left Extreme<br/>1</col>\n"
		outputString += "<col label=\"c2\" value=\"2\">2</col>\n"
		outputString += "<col label=\"c3\" value=\"3\">3</col>\n"
		outputString += "<col label=\"c4\" value=\"4\">4</col>\n"
		outputString += "<col label=\"c5\" value=\"5\">5</col>\n"
		outputString += "<col label=\"c6\" value=\"6\">6</col>\n"
		outputString += "<col label=\"c7\" value=\"7\">7</col>\n"
		outputString += "<col label=\"c8\" value=\"8\">8</col>\n"
		outputString += "<col label=\"c9\" value=\"9\">9</col>\n"
		outputString += "<col label=\"c10\" value=\"10\">Right Extreme<br/>10</col>\n"
		outputString += "</radio>"
		
	# Checkbox question: Ethnicity
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[20]:
		outputString += "<checkbox label=\"Q#\" atleast=\"1\">\n"
		outputString += "<title>Which of the following describes your ethnicity?</title>\n"
		outputString += "<row label=\"r1\">White or Caucasian</row>\n"
		outputString += "<row label=\"r2\">Black or African American</row>\n"
		outputString += "<row label=\"r3\">Asian</row>\n"
		outputString += "<row label=\"r4\">American Indian, Alaska Native, Native Hawaiian or other Pacific Islander</row>\n"
		outputString += "<row label=\"r5\">Some other ethnicity</row>\n"
		outputString += "<row label=\"r6\" exclusive=\"1\">Prefer not to answer</row>\n"
		outputString += "</checkbox>"
		
	# Select question: US state
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[21]:
		outputString += "<select label=\"Q#\" optional=\"0\">\n"
		outputString += "<title>In which state do you reside?</title>\n"
		outputString += "<choice label=\"chAL\">Alabama</choice>\n"
		outputString += "<choice label=\"chAK\">Alaska</choice>\n"
		outputString += "<choice label=\"chAZ\">Arizona</choice>\n"
		outputString += "<choice label=\"chAR\">Arkansas</choice>\n"
		outputString += "<choice label=\"chCA\">California</choice>\n"
		outputString += "<choice label=\"chCO\">Colorado</choice>\n"
		outputString += "<choice label=\"chCT\">Connecticut</choice>\n"
		outputString += "<choice label=\"chDE\">Delaware</choice>\n"
		outputString += "<choice label=\"chDC\">District of Columbia</choice>\n"
		outputString += "<choice label=\"chFL\">Florida</choice>\n"
		outputString += "<choice label=\"chGA\">Georgia</choice>\n"
		outputString += "<choice label=\"chHI\">Hawaii</choice>\n"
		outputString += "<choice label=\"chID\">Idaho</choice>\n"
		outputString += "<choice label=\"chIL\">Illinois</choice>\n"
		outputString += "<choice label=\"chIN\">Indiana</choice>\n"
		outputString += "<choice label=\"chIA\">Iowa</choice>\n"
		outputString += "<choice label=\"chKS\">Kansas</choice>\n"
		outputString += "<choice label=\"chKY\">Kentucky</choice>\n"
		outputString += "<choice label=\"chLA\">Louisiana</choice>\n"
		outputString += "<choice label=\"chME\">Maine</choice>\n"
		outputString += "<choice label=\"chMD\">Maryland</choice>\n"
		outputString += "<choice label=\"chMA\">Massachusetts</choice>\n"
		outputString += "<choice label=\"chMI\">Michigan</choice>\n"
		outputString += "<choice label=\"chMN\">Minnesota</choice>\n"
		outputString += "<choice label=\"chMS\">Mississippi</choice>\n"
		outputString += "<choice label=\"chMO\">Missouri</choice>\n"
		outputString += "<choice label=\"chMT\">Montana</choice>\n"
		outputString += "<choice label=\"chNE\">Nebraska</choice>\n"
		outputString += "<choice label=\"chNV\">Nevada</choice>\n"
		outputString += "<choice label=\"chNH\">New Hampshire</choice>\n"
		outputString += "<choice label=\"chNJ\">New Jersey</choice>\n"
		outputString += "<choice label=\"chNM\">New Mexico</choice>\n"
		outputString += "<choice label=\"chNY\">New York</choice>\n"
		outputString += "<choice label=\"chNC\">North Carolina</choice>\n"
		outputString += "<choice label=\"chND\">North Dakota</choice>\n"
		outputString += "<choice label=\"chOH\">Ohio</choice>\n"
		outputString += "<choice label=\"chOK\">Oklahoma</choice>\n"
		outputString += "<choice label=\"chOR\">Oregon</choice>\n"
		outputString += "<choice label=\"chPA\">Pennsylvania</choice>\n"
		outputString += "<choice label=\"chRI\">Rhode Island</choice>\n"
		outputString += "<choice label=\"chSC\">South Carolina</choice>\n"
		outputString += "<choice label=\"chSD\">South Dakota</choice>\n"
		outputString += "<choice label=\"chTN\">Tennessee</choice>\n"
		outputString += "<choice label=\"chTX\">Texas</choice>\n"
		outputString += "<choice label=\"chUT\">Utah</choice>\n"
		outputString += "<choice label=\"chVT\">Vermont</choice>\n"
		outputString += "<choice label=\"chVA\">Virginia</choice>\n"
		outputString += "<choice label=\"chWA\">Washington</choice>\n"
		outputString += "<choice label=\"chWV\">West Virginia</choice>\n"
		outputString += "<choice label=\"chWI\">Wisconsin</choice>\n"
		outputString += "<choice label=\"chWY\">Wyoming</choice>\n"
		outputString += "</select>"
		
	# Select question: US state with region punch
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[22]:
		outputString += "<select label=\"Q#\" optional=\"0\">\n"
		outputString += "<title>In which state do you reside?</title>\n"
		outputString += "<choice label=\"chAL\">Alabama</choice>\n"
		outputString += "<choice label=\"chAK\">Alaska</choice>\n"
		outputString += "<choice label=\"chAZ\">Arizona</choice>\n"
		outputString += "<choice label=\"chAR\">Arkansas</choice>\n"
		outputString += "<choice label=\"chCA\">California</choice>\n"
		outputString += "<choice label=\"chCO\">Colorado</choice>\n"
		outputString += "<choice label=\"chCT\">Connecticut</choice>\n"
		outputString += "<choice label=\"chDE\">Delaware</choice>\n"
		outputString += "<choice label=\"chDC\">District of Columbia</choice>\n"
		outputString += "<choice label=\"chFL\">Florida</choice>\n"
		outputString += "<choice label=\"chGA\">Georgia</choice>\n"
		outputString += "<choice label=\"chHI\">Hawaii</choice>\n"
		outputString += "<choice label=\"chID\">Idaho</choice>\n"
		outputString += "<choice label=\"chIL\">Illinois</choice>\n"
		outputString += "<choice label=\"chIN\">Indiana</choice>\n"
		outputString += "<choice label=\"chIA\">Iowa</choice>\n"
		outputString += "<choice label=\"chKS\">Kansas</choice>\n"
		outputString += "<choice label=\"chKY\">Kentucky</choice>\n"
		outputString += "<choice label=\"chLA\">Louisiana</choice>\n"
		outputString += "<choice label=\"chME\">Maine</choice>\n"
		outputString += "<choice label=\"chMD\">Maryland</choice>\n"
		outputString += "<choice label=\"chMA\">Massachusetts</choice>\n"
		outputString += "<choice label=\"chMI\">Michigan</choice>\n"
		outputString += "<choice label=\"chMN\">Minnesota</choice>\n"
		outputString += "<choice label=\"chMS\">Mississippi</choice>\n"
		outputString += "<choice label=\"chMO\">Missouri</choice>\n"
		outputString += "<choice label=\"chMT\">Montana</choice>\n"
		outputString += "<choice label=\"chNE\">Nebraska</choice>\n"
		outputString += "<choice label=\"chNV\">Nevada</choice>\n"
		outputString += "<choice label=\"chNH\">New Hampshire</choice>\n"
		outputString += "<choice label=\"chNJ\">New Jersey</choice>\n"
		outputString += "<choice label=\"chNM\">New Mexico</choice>\n"
		outputString += "<choice label=\"chNY\">New York</choice>\n"
		outputString += "<choice label=\"chNC\">North Carolina</choice>\n"
		outputString += "<choice label=\"chND\">North Dakota</choice>\n"
		outputString += "<choice label=\"chOH\">Ohio</choice>\n"
		outputString += "<choice label=\"chOK\">Oklahoma</choice>\n"
		outputString += "<choice label=\"chOR\">Oregon</choice>\n"
		outputString += "<choice label=\"chPA\">Pennsylvania</choice>\n"
		outputString += "<choice label=\"chRI\">Rhode Island</choice>\n"
		outputString += "<choice label=\"chSC\">South Carolina</choice>\n"
		outputString += "<choice label=\"chSD\">South Dakota</choice>\n"
		outputString += "<choice label=\"chTN\">Tennessee</choice>\n"
		outputString += "<choice label=\"chTX\">Texas</choice>\n"
		outputString += "<choice label=\"chUT\">Utah</choice>\n"
		outputString += "<choice label=\"chVT\">Vermont</choice>\n"
		outputString += "<choice label=\"chVA\">Virginia</choice>\n"
		outputString += "<choice label=\"chWA\">Washington</choice>\n"
		outputString += "<choice label=\"chWV\">West Virginia</choice>\n"
		outputString += "<choice label=\"chWI\">Wisconsin</choice>\n"
		outputString += "<choice label=\"chWY\">Wyoming</choice>\n"
		outputString += "</select>\n\n"
		outputString += "<suspend/>\n\n"
		outputString += "<exec>\n"
		outputString += "myState = Q#.selected.label[-2:]\n\n"
		outputString += "if myState in [\"CT\", \"ME\", \"MA\", \"NH\", \"NJ\", \"NY\", \"PA\", \"RI\", \"VT\"]:\n"
		outputString += "\tHP_region4.val = HP_region4.r1.index\n"
		outputString += "elif myState in [\"IL\", \"IN\", \"MI\", \"OH\", \"WI\", \"IA\", \"KS\", \"MN\", \"MO\", \"NE\", \"ND\", \"SD\"]:\n"
		outputString += "\tHP_region4.val = HP_region4.r2.index\n"
		outputString += "elif myState in [\"DE\", \"FL\", \"GA\", \"MD\", \"NC\", \"SC\", \"VA\", \"DC\", \"WV\", \"AL\", \"KY\", \"MS\", \"TN\", \"AR\", \"LA\", \"OK\", \"TX\"]:\n"
		outputString += "\tHP_region4.val = HP_region4.r3.index\n"
		outputString += "elif myState in [\"AZ\", \"CO\", \"ID\", \"MT\", \"NV\", \"NM\", \"UT\", \"WY\", \"AK\", \"CA\", \"HI\", \"OR\", \"WA\"]:\n"
		outputString += "\tHP_region4.val = HP_region4.r4.index\n\n"
		outputString += "if myState in [\"WA\", \"OR\", \"CA\", \"AK\", \"HI\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r1.index\n"
		outputString += "elif myState in [\"MT\", \"ID\", \"WY\", \"CO\", \"UT\", \"NV\", \"AZ\", \"NM\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r2.index\n"
		outputString += "elif myState in [\"ND\", \"MN\", \"SD\", \"NB\", \"IA\", \"KS\", \"MO\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r3.index\n"
		outputString += "elif myState in [\"OK\", \"AR\", \"TX\", \"LA\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r4.index\n"
		outputString += "elif myState in [\"MI\", \"WI\", \"IN\", \"IL\", \"OH\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r5.index\n"
		outputString += "elif myState in [\"KY\", \"TN\", \"MS\", \"AL\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r6.index\n"
		outputString += "elif myState in [\"ME\", \"NH\", \"VT\", \"MA\", \"CT\", \"RI\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r7.index\n"
		outputString += "elif myState in [\"NY\", \"PA\", \"NJ\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r8.index\n"
		outputString += "elif myState in [\"WV\", \"MD\", \"DE\", \"DC\", \"VA\", \"NC\", \"SC\", \"GA\", \"FL\"]:\n"
		outputString += "\tHP_region9.val = HP_region9.r9.index\n"
		outputString += "</exec>\n\n"
		outputString += "<radio label=\"HP_region4\" where=\"execute,survey,report\">\n"
		outputString += "<title>Hidden Question.  Region4</title>\n"
		outputString += "<row label=\"r1\">Northeast</row>\n"
		outputString += "<row label=\"r2\">Midwest</row>\n"
		outputString += "<row label=\"r3\">South</row>\n"
		outputString += "<row label=\"r4\">West</row>\n"
		outputString += "</radio>\n\n"
		outputString += "<radio label=\"HP_region9\" where=\"execute,survey,report\">\n"
		outputString += "<title>Hidden Question.  Region9</title>\n"
		outputString += "<row label=\"r1\">Pacific</row>\n"
		outputString += "<row label=\"r2\">Mountain</row>\n"
		outputString += "<row label=\"r3\">West North Central</row>\n"
		outputString += "<row label=\"r4\">West South Central</row>\n"
		outputString += "<row label=\"r5\">East North Central</row>\n"
		outputString += "<row label=\"r6\">East South Central</row>\n"
		outputString += "<row label=\"r7\">New England</row>\n"
		outputString += "<row label=\"r8\">Mid Atlantic</row>\n"
		outputString += "<row label=\"r9\">South Atlantic</row>\n"
		outputString += "</radio>"
	
	# Number question: Age
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[23]:
		outputString += "<number label=\"Q#\" optional=\"0\" size=\"3\" verify=\"range(0, 120)\">\n"
		outputString += "<title>What is your age?</title>\n"
		outputString += "</number>"
		
	# Number question: Age with age group punch
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[24]:
		outputString += "<number label=\"Q#\" optional=\"0\" size=\"3\" verify=\"range(0, 120)\">\n"
		outputString += "<title>What is your age?</title>\n"
		outputString += "</number>\n\n"
		outputString += "<suspend/>\n\n"
		outputString += "<radio label=\"HP_ageGroup\" where=\"execute,survey,report\">\n"
		outputString += "<title>Hidden Question.  Age group</title>\n"
		outputString += "<exec>\n"
		outputString += "if Q#.val in range(0, 18):\n"
		outputString += "\tHP_ageGroup.val = HP_ageGroup.r1.index\n"
		outputString += "elif Q#.val in range(18, 25):\n"
		outputString += "\tHP_ageGroup.val = HP_ageGroup.r2.index\n"
		outputString += "elif Q#.val in range(25, 35):\n"
		outputString += "\tHP_ageGroup.val = HP_ageGroup.r3.index\n"
		outputString += "elif Q#.val in range(35, 45):\n"
		outputString += "\tHP_ageGroup.val = HP_ageGroup.r4.index\n"
		outputString += "elif Q#.val in range(45, 55):\n"
		outputString += "\tHP_ageGroup.val = HP_ageGroup.r5.index\n"
		outputString += "elif Q#.val in range(55, 65):\n"
		outputString += "\tHP_ageGroup.val = HP_ageGroup.r6.index\n"
		outputString += "else:\n"
		outputString += "\tHP_ageGroup.val = HP_ageGroup.r7.index\n"
		outputString += "</exec>\n"
		outputString += "<row label=\"r1\">Under 18</row>\n"
		outputString += "<row label=\"r2\">18-24</row>\n"
		outputString += "<row label=\"r3\">25-34</row>\n"
		outputString += "<row label=\"r4\">35-44</row>\n"
		outputString += "<row label=\"r5\">45-54</row>\n"
		outputString += "<row label=\"r6\">55-64</row>\n"
		outputString += "<row label=\"r7\">65 or older</row>\n"
		outputString += "</radio>"
	
	# Text question: Zipcode
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[25]:
		outputString += "<text label=\"Q#\" optional=\"0\" size=\"5\" verify=\"zipcode\">\n"
		outputString += "<title>What is your zip code?</title>\n"
		outputString += "</text>"
		
	# Text question: Zipcode with DMA template
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[26]:
		outputString += "<text label=\"Q#\" optional=\"0\" size=\"5\" verify=\"zipcode\">\n"
		outputString += "<title>What is your zip code?</title>\n"
		outputString += "</text>\n\n"
		outputString += "<suspend/>\n\n"
		outputString += "<exec>\n"
		outputString += "p.zipCodeDict = dict(zcode=Q#.val)  \n"
		outputString += "p.surveyWillTerm = False\n"
		outputString += "</exec>\n\n"
		outputString += "<logic label=\"zipCodeAPI\" api:params=\"p.zipCodeDict\" api:url=\"http://speeders.researchnow.com/zipcode/dmalookup.php\" uses=\"api.1\"/>\n"
		outputString += "<exec sst=\"0\">\n"
		outputString += "if zipCodeAPI.status == 200:\n"
		outputString += "\ttry:\n"
		outputString += "\t\tp.surveyWillTerm = True\n"
		outputString += "\t\tfor i in range(0, 6):\n"
		outputString += "\t\t\tdmaData.cols[i].ZIP_CODE.val = zipCodeAPI.r[i]['ZIP_CODE']\n"
		outputString += "\t\t\tdmaData.cols[i].DMA_CODE.val = zipCodeAPI.r[i]['DMA_CODE']\n"
		outputString += "\t\t\tdmaData.cols[i].DMA_NAME.val = zipCodeAPI.r[i]['DMA_NAME']\n"
		outputString += "\t\t\tdmaData.cols[i].ADDITIONAL_DMA_CODE.val = zipCodeAPI.r[i]['ADDITIONAL_DMA_CODE']\n"
		outputString += "\t\t\tdmaData.cols[i].STATE_CODE.val = zipCodeAPI.r[i]['STATE_CODE']\n"
		outputString += "\t\t\tdmaData.cols[i].STATE_ABV.val = zipCodeAPI.r[i]['STATE_ABV']\n"
		outputString += "\t\t\tdmaData.cols[i].COUNTY_CODE.val = zipCodeAPI.r[i]['CITY_CODE']\n"
		outputString += "\t\t\tdmaData.cols[i].COUNTY_NAME.val = zipCodeAPI.r[i]['CITY_NAME']\n"
		outputString += "\t\t\tdmaData.cols[i].COUNTY_SIZE.val = zipCodeAPI.r[i]['CITY_SIZE']\n"
		outputString += "\t\t\tdmaData.cols[i].NMR_TERR_CODE.val = zipCodeAPI.r[i]['NMR_TERR_CODE']\n"
		outputString += "\t\t\tdmaData.cols[i].NOT_USED.val = zipCodeAPI.r[i]['NOT_USED']\n"
		outputString += "\t\t\tdmaData.cols[i].DMA_RANK.val = zipCodeAPI.r[i]['DMA_RANK']\n"
		outputString += "\t\t\tdmaData.cols[i].METRO_INDICATOR.val = zipCodeAPI.r[i]['METRO_INDICATOR']\n\n"
		outputString += "\t\t\t# If this point is reached, then we have complete data for at least one set and thus we will not term the survey\n"
		outputString += "\t\t\tp.surveyWillTerm = False\n"
		outputString += "\texcept IndexError:\n"
		outputString += "\t\tprint \"IndexError occurred; either we have no data or we do not have 6 full columns of data\"\n"
		outputString += "else:\n"
		outputString += "\t# Status code was not 200, which means that the data did not return successfully; thus we term\n"
		outputString += "\tp.surveyWillTerm = True\n"
		outputString += "</exec>\n\n"
		outputString += "<term cond=\"p.surveyWillTerm\">No DMA matched</term>\n\n"
		outputString += "<text label=\"dmaData\" sst=\"0\" translateable=\"0\" where=\"execute,survey,report\">\n"
		outputString += "<title>DMA data for zipcode</title>\n"
		outputString += "<row label=\"ZIP_CODE\">ZIP_CODE</row>\n"
		outputString += "<row label=\"DMA_CODE\">DMA_CODE</row>\n"
		outputString += "<row label=\"DMA_NAME\">DMA_NAME</row>\n"
		outputString += "<row label=\"ADDITIONAL_DMA_CODE\">ADDITIONAL_DMA_CODE</row>\n"
		outputString += "<row label=\"STATE_CODE\">STATE_CODE</row>\n"
		outputString += "<row label=\"STATE_ABV\">STATE_ABV</row>\n"
		outputString += "<row label=\"COUNTY_CODE\">COUNTY_CODE</row>\n"
		outputString += "<row label=\"COUNTY_NAME\">COUNTY_NAME</row>\n"
		outputString += "<row label=\"COUNTY_SIZE\">COUNTY_SIZE</row>\n"
		outputString += "<row label=\"NMR_TERR_CODE\">NMR_TERR_CODE</row>\n"
		outputString += "<row label=\"NOT_USED\">NOT_USED</row>\n"
		outputString += "<row label=\"DMA_RANK\">DMA_RANK</row>\n"
		outputString += "<row label=\"METRO_INDICATOR\">METRO_INDICATOR</row>\n"
		outputString += "<col label=\"c1\">DMA data from DB 1:</col>\n"
		outputString += "<col label=\"c2\">DMA data from DB 2:</col>\n"
		outputString += "<col label=\"c3\">DMA data from DB 3:</col>\n"
		outputString += "<col label=\"c4\">DMA data from DB 4:</col>\n"
		outputString += "<col label=\"c5\">DMA data from DB 5:</col>\n"
		outputString += "<col label=\"c6\">DMA data from DB 6:</col>\n"
		outputString += "</text>\n\n"
		outputString += "<suspend/>\n\n"
		outputString += "<exec sst=\"0\">\n"
		outputString += "region4NE = [6,18,20,28,29,31,37,38,44]\n"
		outputString += "region4MW = [12,13,14,15,21,22,24,26,33,34,40,48]\n"
		outputString += "region4SO = [7,8,9,10,19,32,39,45,47,1,16,23,41,3,17,35,42]\n"
		outputString += "region4WE = [2,5,11,30,25,43,27,49,50,4,51,36,46]\n\n"
		outputString += "region4Array = [region4NE, region4MW, region4SO, region4WE]\n\n"
		outputString += "for i in range(0, len(region4Array)):\n"
		outputString += "\tif int(dmaData.cols[0].STATE_CODE.val) in region4Array[i]:\n"
		outputString += "\t\tregion4.val = i\n"
		outputString += "</exec>\n\n"
		outputString += "<exec sst=\"0\">\n"
		outputString += "region9PAC = [46,36,4,50,51]\n"
		outputString += "region9MTN = [25,11,49,27,43,5,2,30]\n"
		outputString += "region9WNC = [33,40,26,15,22,14,24]\n"
		outputString += "region9WSC = [42,35,3,17]\n"
		outputString += "region9ENC = [48,12,21,13,34]\n"
		outputString += "region9ESC = [16,41,23,1]\n"
		outputString += "region9SA =  [9,10,39,32,45,47,8,19,7]\n"
		outputString += "region9MA =  [31,29,37]\n"
		outputString += "region9NE =  [18,28,44,20,38,6]\n\n"
		outputString += "region9Array = [region9PAC, region9MTN, region9WNC, region9WSC, region9ENC, region9ESC, region9SA, region9MA, region9NE]\n\n"
		outputString += "for i in range(0, len(region9Array)):\n"
		outputString += "\tif int(dmaData.cols[0].STATE_CODE.val) in region9Array[i]:\n"
		outputString += "\t\tregion9.val = i\n"
		outputString += "</exec>\n\n"
		outputString += "<suspend/>\n\n"
		outputString += "<radio label=\"region4\" grouping=\"cols\" optional=\"1\" translateable=\"0\" where=\"execute,survey,report\">\n"
		outputString += "<title>4-Region Assignment for zipcode </title>\n"
		outputString += "<row label=\"r1\">Northeast</row>\n"
		outputString += "<row label=\"r2\">Midwest</row>\n"
		outputString += "<row label=\"r3\">South</row>\n"
		outputString += "<row label=\"r4\">West</row>\n"
		outputString += "</radio>\n\n"
		outputString += "<radio label=\"region9\" grouping=\"cols\" optional=\"1\" translateable=\"0\" where=\"execute,survey,report\">\n"
		outputString += "<title>9-Region Assignment for zipcode </title>\n"
		outputString += "<row label=\"r1\">Pacific</row>\n"
		outputString += "<row label=\"r2\">Mountain</row>\n"
		outputString += "<row label=\"r3\">WNC</row>\n"
		outputString += "<row label=\"r4\">WSC</row>\n"
		outputString += "<row label=\"r5\">ENC</row>\n"
		outputString += "<row label=\"r6\">ESC</row>\n"
		outputString += "<row label=\"r7\">SA</row>\n"
		outputString += "<row label=\"r8\">MA</row>\n"
		outputString += "<row label=\"r9\">NE</row>\n"
		outputString += "</radio>\n\n"
		outputString += "<suspend/>\n\n"
		outputString += "<exec sst=\"0\">\n"
		outputString += "p.actualStateCode = dmaData.cols[0].STATE_ABV.val\n\n"
		outputString += "stateArray = [\"AL\", \"AK\", \"AZ\", \"AR\", \"CA\", \"CO\", \"CT\", \"DE\", \"FL\", \"GA\", \"HI\", \"ID\", \"IL\", \"IN\", \"IA\", \"KS\", \"KY\", \"LA\", \"ME\", \"MD\", \"MA\", \"MI\", \"MN\", \"MS\", \"MO\", \"MT\", \"NE\", \"NV\", \"NH\", \"NJ\", \"NM\", \"NY\", \"NC\", \"ND\", \"OH\", \"OK\", \"OR\", \"PA\", \"RI\", \"SC\", \"SD\", \"TN\", \"TX\", \"UT\", \"VT\", \"VA\", \"WA\", \"WV\", \"WI\", \"WY\", \"AS\", \"DC\", \"FM\", \"GU\", \"MH\", \"MP\", \"PW\", \"PR\", \"VI\"]\n\n"
		outputString += "if p.actualStateCode in stateArray:\n"
		outputString += "\tSTATE.val = stateArray.index(p.actualStateCode)\n"
		outputString += "else:\n"
		outputString += "\tSTATE.val = len(STATE.rows) - 1\n"
		outputString += "</exec>\n\n"
		outputString += "<radio label=\"STATE\" multicol:count=\"4\" optional=\"1\" translateable=\"0\" uses=\"multicol.7\" where=\"execute,survey,report\">\n"
		outputString += "<title>Hidden Punch.  State of Residence</title>\n"
		outputString += "<row label=\"rAL\">Alabama</row>\n"
		outputString += "<row label=\"rAK\">Alaska</row>\n"
		outputString += "<row label=\"rAZ\">Arizona</row>\n"
		outputString += "<row label=\"rAR\">Arkansas</row>\n"
		outputString += "<row label=\"rCA\">California</row>\n"
		outputString += "<row label=\"rCO\">Colorado</row>\n"
		outputString += "<row label=\"rCT\">Connecticut</row>\n"
		outputString += "<row label=\"rDE\">Delaware</row>\n"
		outputString += "<row label=\"rFL\">Florida</row>\n"
		outputString += "<row label=\"rGA\">Georgia</row>\n"
		outputString += "<row label=\"rHI\">Hawaii</row>\n"
		outputString += "<row label=\"rID\">Idaho</row>\n"
		outputString += "<row label=\"rIL\">Illinois</row>\n"
		outputString += "<row label=\"rIN\">Indiana</row>\n"
		outputString += "<row label=\"rIA\">Iowa</row>\n"
		outputString += "<row label=\"rKS\">Kansas</row>\n"
		outputString += "<row label=\"rKY\">Kentucky</row>\n"
		outputString += "<row label=\"rLA\">Louisiana</row>\n"
		outputString += "<row label=\"rME\">Maine</row>\n"
		outputString += "<row label=\"rMD\">Maryland</row>\n"
		outputString += "<row label=\"rMA\">Massachusetts</row>\n"
		outputString += "<row label=\"rMI\">Michigan</row>\n"
		outputString += "<row label=\"rMN\">Minnesota</row>\n"
		outputString += "<row label=\"rMS\">Mississippi</row>\n"
		outputString += "<row label=\"rMO\">Missouri</row>\n"
		outputString += "<row label=\"rMT\">Montana</row>\n"
		outputString += "<row label=\"rNE\">Nebraska</row>\n"
		outputString += "<row label=\"rNV\">Nevada</row>\n"
		outputString += "<row label=\"rNH\">New Hampshire</row>\n"
		outputString += "<row label=\"rNJ\">New Jersey</row>\n"
		outputString += "<row label=\"rNM\">New Mexico</row>\n"
		outputString += "<row label=\"rNY\">New York</row>\n"
		outputString += "<row label=\"rNC\">North Carolina</row>\n"
		outputString += "<row label=\"rND\">North Dakota</row>\n"
		outputString += "<row label=\"rOH\">Ohio</row>\n"
		outputString += "<row label=\"rOK\">Oklahoma</row>\n"
		outputString += "<row label=\"rOR\">Oregon</row>\n"
		outputString += "<row label=\"rPA\">Pennsylvania</row>\n"
		outputString += "<row label=\"rRI\">Rhode Island</row>\n"
		outputString += "<row label=\"rSC\">South Carolina</row>\n"
		outputString += "<row label=\"rSD\">South Dakota</row>\n"
		outputString += "<row label=\"rTN\">Tennessee</row>\n"
		outputString += "<row label=\"rTX\">Texas</row>\n"
		outputString += "<row label=\"rUT\">Utah</row>\n"
		outputString += "<row label=\"rVT\">Vermont</row>\n"
		outputString += "<row label=\"rVA\">Virginia</row>\n"
		outputString += "<row label=\"rWA\">Washington</row>\n"
		outputString += "<row label=\"rWV\">West Virginia</row>\n"
		outputString += "<row label=\"rWI\">Wisconsin</row>\n"
		outputString += "<row label=\"rWY\">Wyoming</row>\n"
		outputString += "<row label=\"rAS\">American Samoa</row>\n"
		outputString += "<row label=\"rDC\">District of Columbia</row>\n"
		outputString += "<row label=\"rFM\">Federated States of Micronesia</row>\n"
		outputString += "<row label=\"rGU\">Guam</row>\n"
		outputString += "<row label=\"rMH\">Marshall Islands</row>\n"
		outputString += "<row label=\"rMP\">Northern Mariana Islands</row>\n"
		outputString += "<row label=\"rPW\">Palau</row>\n"
		outputString += "<row label=\"rPR\">Puerto Rico</row>\n"
		outputString += "<row label=\"rVI\">Virgin Islands</row>\n"
		outputString += "<row label=\"rOTH\">Other/None</row>\n"
		outputString += "</radio>\n\n"
		outputString += "<suspend/>\n\n"
		outputString += "<exec sst=\"0\">\n"
		outputString += "p.actualDMACode = dmaData.cols[0].DMA_CODE.val\n\n"
		outputString += "dmaArray = [\"662\", \"525\", \"532\", \"790\", \"644\", \"583\", \"634\", \"743\", \"524\", \"520\", \"635\", \"800\", \"512\", \"537\", \"716\", \"692\", \"821\", \"756\", \"746\", \"502\", \"630\", \"559\", \"757\", \"506\", \"736\", \"514\", \"523\", \"754\", \"767\", \"637\", \"648\", \"519\", \"564\", \"517\", \"584\", \"575\", \"759\", \"602\", \"868\", \"515\", \"598\", \"510\", \"752\", \"546\", \"604\", \"522\", \"535\", \"673\", \"600\", \"623\", \"682\", \"542\", \"751\", \"679\", \"505\", \"606\", \"676\", \"765\", \"565\", \"516\", \"801\", \"802\", \"649\", \"745\", \"724\", \"513\", \"866\", \"571\", \"670\", \"509\", \"592\", \"798\", \"773\", \"563\", \"755\", \"658\", \"518\", \"545\", \"567\", \"647\", \"636\", \"566\", \"569\", \"533\", \"710\", \"766\", \"744\", \"618\", \"691\", \"758\", \"527\", \"718\", \"639\", \"561\", \"574\", \"734\", \"603\", \"747\", \"616\", \"557\", \"702\", \"582\", \"642\", \"643\", \"551\", \"749\", \"839\", \"541\", \"558\", \"722\", \"693\", \"803\", \"529\", \"651\", \"503\", \"669\", \"737\", \"553\", \"813\", \"640\", \"711\", \"528\", \"617\", \"613\", \"687\", \"762\", \"686\", \"628\", \"828\", \"698\", \"570\", \"659\", \"622\", \"501\", \"544\", \"740\", \"633\", \"650\", \"652\", \"534\", \"631\", \"632\", \"804\", \"656\", \"597\", \"675\", \"504\", \"753\", \"508\", \"820\", \"500\", \"552\", \"521\", \"717\", \"560\", \"764\", \"811\", \"556\", \"573\", \"538\", \"611\", \"610\", \"862\", \"576\", \"770\", \"661\", \"641\", \"825\", \"807\", \"855\", \"507\", \"819\", \"657\", \"612\", \"624\", \"725\", \"588\", \"881\", \"619\", \"543\", \"638\", \"609\", \"555\", \"530\", \"539\", \"581\", \"547\", \"605\", \"540\", \"531\", \"789\", \"671\", \"760\", \"709\", \"526\", \"626\", \"625\", \"511\", \"549\", \"705\", \"548\", \"554\", \"627\", \"678\", \"577\", \"550\", \"810\", \"536\", \"771\", \"596\"]\n\n"
		outputString += "if p.actualDMACode in dmaArray:\n"
		outputString += "\tDMA.val = dmaArray.index(p.actualDMACode)\n"
		outputString += "else:\n"
		outputString += "\tDMA.val = len(DMA.rows) - 1\n"
		outputString += "</exec>\n\n"
		outputString += "<radio label=\"DMA\" multicol:count=\"4\" optional=\"1\" uses=\"multicol.7\"  where=\"execute,survey,report\">\n"
		outputString += "<title>DMA Code to City Assignment</title>\n"
		outputString += "<row label=\"r662\">662 Abilene-Sweetwater, TX</row>\n"
		outputString += "<row label=\"r525\">525 Albany, GA</row>\n"
		outputString += "<row label=\"r532\">532 Albany-Schenectady-Troy, NY</row>\n"
		outputString += "<row label=\"r790\">790 Albuquerque-Santa Fe, NM</row>\n"
		outputString += "<row label=\"r644\">644 Alexandria, LA</row>\n"
		outputString += "<row label=\"r583\">583 Alpena, MI</row>\n"
		outputString += "<row label=\"r634\">634 Amarillo, TX</row>\n"
		outputString += "<row label=\"r743\">743 Anchorage, AK</row>\n"
		outputString += "<row label=\"r524\">524 Atlanta, GA</row>\n"
		outputString += "<row label=\"r520\">520 Augusta, GA</row>\n"
		outputString += "<row label=\"r635\">635 Austin, TX</row>\n"
		outputString += "<row label=\"r800\">800 Bakersfield, CA</row>\n"
		outputString += "<row label=\"r512\">512 Baltimore, MD</row>\n"
		outputString += "<row label=\"r537\">537 Bangor, ME</row>\n"
		outputString += "<row label=\"r716\">716 Baton Rouge, LA</row>\n"
		outputString += "<row label=\"r692\">692 Beaumont-Port Arthur, TX</row>\n"
		outputString += "<row label=\"r821\">821 Bend, OR</row>\n"
		outputString += "<row label=\"r756\">756 Billings, MT</row>\n"
		outputString += "<row label=\"r746\">746 Biloxi-Gulfport, MS</row>\n"
		outputString += "<row label=\"r502\">502 Binghamton, NY</row>\n"
		outputString += "<row label=\"r630\">630 Birmingham (Anniston and Tuscaloosa), AL</row>\n"
		outputString += "<row label=\"r559\">559 Bluefield-Beckley-Oak Hill, WV</row>\n"
		outputString += "<row label=\"r757\">757 Boise, ID</row>\n"
		outputString += "<row label=\"r506\">506 Boston, MA (Manchester, NH)</row>\n"
		outputString += "<row label=\"r736\">736 Bowling Green, KY</row>\n"
		outputString += "<row label=\"r514\">514 Buffalo, NY</row>\n"
		outputString += "<row label=\"r523\">523 Burlington, VT-Plattsburgh, NY</row>\n"
		outputString += "<row label=\"r754\">754 Butte-Bozeman, MT</row>\n"
		outputString += "<row label=\"r767\">767 Casper-Riverton, WY</row>\n"
		outputString += "<row label=\"r637\">637 Cedar Rapids-Waterloo-Iowa City and Dubuque, IA</row>\n"
		outputString += "<row label=\"r648\">648 Champaign and Springfield-Decatur, IL</row>\n"
		outputString += "<row label=\"r519\">519 Charleston, SC</row>\n"
		outputString += "<row label=\"r564\">564 Charleston-Huntington, WV</row>\n"
		outputString += "<row label=\"r517\">517 Charlotte, NC</row>\n"
		outputString += "<row label=\"r584\">584 Charlottesville, VA</row>\n"
		outputString += "<row label=\"r575\">575 Chattanooga, TN</row>\n"
		outputString += "<row label=\"r759\">759 Cheyenne, WY-Scottsbluff, NE</row>\n"
		outputString += "<row label=\"r602\">602 Chicago, IL</row>\n"
		outputString += "<row label=\"r868\">868 Chico-Redding, CA</row>\n"
		outputString += "<row label=\"r515\">515 Cincinnati, OH</row>\n"
		outputString += "<row label=\"r598\">598 Clarksburg-Weston, WV</row>\n"
		outputString += "<row label=\"r510\">510 Cleveland-Akron (Canton), OH</row>\n"
		outputString += "<row label=\"r752\">752 Colorado Springs-Pueblo, CO</row>\n"
		outputString += "<row label=\"r546\">546 Columbia, SC</row>\n"
		outputString += "<row label=\"r604\">604 Columbia-Jefferson City, MO</row>\n"
		outputString += "<row label=\"r522\">522 Columbus, GA</row>\n"
		outputString += "<row label=\"r535\">535 Columbus, OH</row>\n"
		outputString += "<row label=\"r673\">673 Columbus-Tupelo-West Point, MS</row>\n"
		outputString += "<row label=\"r600\">600 Corpus Christi, TX</row>\n"
		outputString += "<row label=\"r623\">623 Dallas-Ft. Worth, TX</row>\n"
		outputString += "<row label=\"r682\">682 Davenport, IA-Rock Island-Moline, IL</row>\n"
		outputString += "<row label=\"r542\">542 Dayton, OH</row>\n"
		outputString += "<row label=\"r751\">751 Denver, CO</row>\n"
		outputString += "<row label=\"r679\">679 Des Moines-Ames, IA</row>\n"
		outputString += "<row label=\"r505\">505 Detroit, MI</row>\n"
		outputString += "<row label=\"r606\">606 Dothan, AL</row>\n"
		outputString += "<row label=\"r676\">676 Duluth, MN-Superior, WI</row>\n"
		outputString += "<row label=\"r765\">765 El Paso, TX</row>\n"
		outputString += "<row label=\"r565\">565 Elmira, NY</row>\n"
		outputString += "<row label=\"r516\">516 Erie, PA</row>\n"
		outputString += "<row label=\"r801\">801 Eugene, OR</row>\n"
		outputString += "<row label=\"r802\">802 Eureka, CA</row>\n"
		outputString += "<row label=\"r649\">649 Evansville, IN</row>\n"
		outputString += "<row label=\"r745\">745 Fairbanks, AK</row>\n"
		outputString += "<row label=\"r724\">724 Fargo-Valley City, ND</row>\n"
		outputString += "<row label=\"r513\">513 Flint-Saginaw-Bay City, MI</row>\n"
		outputString += "<row label=\"r866\">866 Fresno-Visalia, CA</row>\n"
		outputString += "<row label=\"r571\">571 Ft. Myers-Naples, Fl</row>\n"
		outputString += "<row label=\"r670\">670 Ft. Smith-Fayetteville-Springdale-Rogers, AR</row>\n"
		outputString += "<row label=\"r509\">509 Ft. Wayne, IN</row>\n"
		outputString += "<row label=\"r592\">592 Gainesville, FL</row>\n"
		outputString += "<row label=\"r798\">798 Glendive, MT</row>\n"
		outputString += "<row label=\"r773\">773 Grand Junction-Montrose, CO</row>\n"
		outputString += "<row label=\"r563\">563 Grand Rapids-Kalamazoo-Battle Creek, MI</row>\n"
		outputString += "<row label=\"r755\">755 Great Falls, MT</row>\n"
		outputString += "<row label=\"r658\">658 Green Bay-Appleton, WI</row>\n"
		outputString += "<row label=\"r518\">518 Greensboro-High Point-Winston Salem, NC</row>\n"
		outputString += "<row label=\"r545\">545 Greenville-New Bern-Washington, NC</row>\n"
		outputString += "<row label=\"r567\">567 Greenville-Spartanburg, SC-Asheville, NC-Anderson,SC</row>\n"
		outputString += "<row label=\"r647\">647 Greenwood-Greenville, MS</row>\n"
		outputString += "<row label=\"r636\">636 Harlingen-Weslaco-Brownsville-McAllen, TX</row>\n"
		outputString += "<row label=\"r566\">566 Harrisburg-Lancaster-Lebanon-York, PA</row>\n"
		outputString += "<row label=\"r569\">569 Harrisonburg, VA</row>\n"
		outputString += "<row label=\"r533\">533 Hartford and New Haven, CT</row>\n"
		outputString += "<row label=\"r710\">710 Hattiesburg-Laurel, MS</row>\n"
		outputString += "<row label=\"r766\">766 Helena, MT</row>\n"
		outputString += "<row label=\"r744\">744 Honolulu, HI</row>\n"
		outputString += "<row label=\"r618\">618 Houston, TX</row>\n"
		outputString += "<row label=\"r691\">691 Huntsville-Decatur (Florence), AL</row>\n"
		outputString += "<row label=\"r758\">758 Idaho Falls-Pocatello, ID</row>\n"
		outputString += "<row label=\"r527\">527 Indianapolis, IN</row>\n"
		outputString += "<row label=\"r718\">718 Jackson, MS</row>\n"
		outputString += "<row label=\"r639\">639 Jackson, TN</row>\n"
		outputString += "<row label=\"r561\">561 Jacksonville, FL</row>\n"
		outputString += "<row label=\"r574\">574 Johnstown-Altoona, PA</row>\n"
		outputString += "<row label=\"r734\">734 Jonesboro, AR</row>\n"
		outputString += "<row label=\"r603\">603 Joplin, MO-Pittsburg, KS</row>\n"
		outputString += "<row label=\"r747\">747 Juneau, AK</row>\n"
		outputString += "<row label=\"r616\">616 Kansas City, MO</row>\n"
		outputString += "<row label=\"r557\">557 Knoxville, TN</row>\n"
		outputString += "<row label=\"r702\">702 La Crosse-Eau Claire, WI</row>\n"
		outputString += "<row label=\"r582\">582 Lafayette, IN</row>\n"
		outputString += "<row label=\"r642\">642 Lafayette, LA</row>\n"
		outputString += "<row label=\"r643\">643 Lake Charles, LA</row>\n"
		outputString += "<row label=\"r551\">551 Lansing, MI</row>\n"
		outputString += "<row label=\"r749\">749 Laredo, TX</row>\n"
		outputString += "<row label=\"r839\">839 Las Vegas, NV</row>\n"
		outputString += "<row label=\"r541\">541 Lexington, KY</row>\n"
		outputString += "<row label=\"r558\">558 Lima, OH</row>\n"
		outputString += "<row label=\"r722\">722 Lincoln and Hastings-Kearney, NE</row>\n"
		outputString += "<row label=\"r693\">693 Little Rock-Pine Bluff, AR</row>\n"
		outputString += "<row label=\"r803\">803 Los Angeles, CA</row>\n"
		outputString += "<row label=\"r529\">529 Louisville, KY</row>\n"
		outputString += "<row label=\"r651\">651 Lubbock, TX</row>\n"
		outputString += "<row label=\"r503\">503 Macon, GA</row>\n"
		outputString += "<row label=\"r669\">669 Madison, WI</row>\n"
		outputString += "<row label=\"r737\">737 Mankato, MN</row>\n"
		outputString += "<row label=\"r553\">553 Marquette, MI</row>\n"
		outputString += "<row label=\"r813\">813 Medford-Klamath Falls, OR</row>\n"
		outputString += "<row label=\"r640\">640 Memphis, TN</row>\n"
		outputString += "<row label=\"r711\">711 Meridian, MS</row>\n"
		outputString += "<row label=\"r528\">528 Miami-Fort Lauderdale, FL</row>\n"
		outputString += "<row label=\"r617\">617 Milwaukee, WI</row>\n"
		outputString += "<row label=\"r613\">613 Minneapolis-St. Paul, MN</row>\n"
		outputString += "<row label=\"r687\">687 Minot-Bismarck-Dickinson(Williston), ND</row>\n"
		outputString += "<row label=\"r762\">762 Missoula, MT</row>\n"
		outputString += "<row label=\"r686\">686 Mobile, AL-Pensacola (Ft. Walton Beach), FL</row>\n"
		outputString += "<row label=\"r628\">628 Monroe, LA-El Dorado, AR</row>\n"
		outputString += "<row label=\"r828\">828 Monterey-Salinas, CA</row>\n"
		outputString += "<row label=\"r698\">698 Montgomery-Selma, AL</row>\n"
		outputString += "<row label=\"r570\">570 Myrtle Beach-Florence, SC</row>\n"
		outputString += "<row label=\"r659\">659 Nashville, TN</row>\n"
		outputString += "<row label=\"r622\">622 New Orleans, LA</row>\n"
		outputString += "<row label=\"r501\">501 New York, NY</row>\n"
		outputString += "<row label=\"r544\">544 Norfolk-Portsmouth-Newport News, VA</row>\n"
		outputString += "<row label=\"r740\">740 North Platte, NE</row>\n"
		outputString += "<row label=\"r633\">633 Odessa-Midland, TX</row>\n"
		outputString += "<row label=\"r650\">650 Oklahoma City, OK</row>\n"
		outputString += "<row label=\"r652\">652 Omaha, NE</row>\n"
		outputString += "<row label=\"r534\">534 Orlando-Daytona Beach-Melbourne, FL</row>\n"
		outputString += "<row label=\"r631\">631 Ottumwa, IA-Kirksville, MO</row>\n"
		outputString += "<row label=\"r632\">632 Paducah, KY-Cape Girardeau, MO-Harrisburg, IL</row>\n"
		outputString += "<row label=\"r804\">804 Palm Springs, CA</row>\n"
		outputString += "<row label=\"r656\">656 Panama City, FL</row>\n"
		outputString += "<row label=\"r597\">597 Parkersburg, WV</row>\n"
		outputString += "<row label=\"r675\">675 Peoria-Bloomington, IL</row>\n"
		outputString += "<row label=\"r504\">504 Philadelphia, PA</row>\n"
		outputString += "<row label=\"r753\">753 Phoenix, AZ</row>\n"
		outputString += "<row label=\"r508\">508 Pittsburgh, PA</row>\n"
		outputString += "<row label=\"r820\">820 Portland, OR</row>\n"
		outputString += "<row label=\"r500\">500 Portland-Auburn, ME</row>\n"
		outputString += "<row label=\"r552\">552 Presque Isle, ME</row>\n"
		outputString += "<row label=\"r521\">521 Providence, RI-New Bedford, MA</row>\n"
		outputString += "<row label=\"r717\">717 Quincy, IL-Hannibal, MO-Keokuk, IA</row>\n"
		outputString += "<row label=\"r560\">560 Raleigh-Durham (Fayetteville), NC</row>\n"
		outputString += "<row label=\"r764\">764 Rapid City, SD</row>\n"
		outputString += "<row label=\"r811\">811 Reno, NV</row>\n"
		outputString += "<row label=\"r556\">556 Richmond-Petersburg, VA</row>\n"
		outputString += "<row label=\"r573\">573 Roanoke-Lynchburg, VA</row>\n"
		outputString += "<row label=\"r538\">538 Rochester, NY</row>\n"
		outputString += "<row label=\"r611\">611 Rochester, MN-Mason City, IA-Austin, MN</row>\n"
		outputString += "<row label=\"r610\">610 Rockford, IL</row>\n"
		outputString += "<row label=\"r862\">862 Sacramento-Stockton-Modesto, CA</row>\n"
		outputString += "<row label=\"r576\">576 Salisbury, MD</row>\n"
		outputString += "<row label=\"r770\">770 Salt Lake City, UT</row>\n"
		outputString += "<row label=\"r661\">661 San Angelo, TX</row>\n"
		outputString += "<row label=\"r641\">641 San Antonio, TX</row>\n"
		outputString += "<row label=\"r825\">825 San Diego, CA</row>\n"
		outputString += "<row label=\"r807\">807 San Francisco-Oakland-San Jose, CA</row>\n"
		outputString += "<row label=\"r855\">855 Santa Barbara-Santa Maria-San Luis Obispo, CA</row>\n"
		outputString += "<row label=\"r507\">507 Savannah, GA</row>\n"
		outputString += "<row label=\"r819\">819 Seattle-Tacoma, WA</row>\n"
		outputString += "<row label=\"r657\">657 Sherman, TX-Ada, OK</row>\n"
		outputString += "<row label=\"r612\">612 Shreveport, LA</row>\n"
		outputString += "<row label=\"r624\">624 Sioux City, IA</row>\n"
		outputString += "<row label=\"r725\">725 Sioux Falls (Mitchell), SD</row>\n"
		outputString += "<row label=\"r588\">588 South Bend-Elkhart, IN</row>\n"
		outputString += "<row label=\"r881\">881 Spokane, WA</row>\n"
		outputString += "<row label=\"r619\">619 Springfield, MO</row>\n"
		outputString += "<row label=\"r543\">543 Springfield-Holyoke, MA</row>\n"
		outputString += "<row label=\"r638\">638 St. Joseph, MO</row>\n"
		outputString += "<row label=\"r609\">609 St. Louis, MO</row>\n"
		outputString += "<row label=\"r555\">555 Syracuse, NY</row>\n"
		outputString += "<row label=\"r530\">530 Tallahassee, FL-Thomasville, GA</row>\n"
		outputString += "<row label=\"r539\">539 Tampa-St. Petersburg (Sarasota), FL</row>\n"
		outputString += "<row label=\"r581\">581 Terre Haute, IN</row>\n"
		outputString += "<row label=\"r547\">547 Toledo, OH</row>\n"
		outputString += "<row label=\"r605\">605 Topeka, KS</row>\n"
		outputString += "<row label=\"r540\">540 Traverse City-Cadillac, MI</row>\n"
		outputString += "<row label=\"r531\">531 Tri-Cities, TN-VA</row>\n"
		outputString += "<row label=\"r789\">789 Tucson (Sierra Vista), AZ</row>\n"
		outputString += "<row label=\"r671\">671 Tulsa, OK</row>\n"
		outputString += "<row label=\"r760\">760 Twin Falls, ID</row>\n"
		outputString += "<row label=\"r709\">709 Tyler-Longview(Lufkin and Nacogdoches), TX</row>\n"
		outputString += "<row label=\"r526\">526 Utica, NY</row>\n"
		outputString += "<row label=\"r626\">626 Victoria, TX</row>\n"
		outputString += "<row label=\"r625\">625 Waco-Temple-Bryan, TX</row>\n"
		outputString += "<row label=\"r511\">511 Washington, DC (Hagerstown, MD)</row>\n"
		outputString += "<row label=\"r549\">549 Watertown, NY</row>\n"
		outputString += "<row label=\"r705\">705 Wausau-Rhinelander, WI</row>\n"
		outputString += "<row label=\"r548\">548 West Palm Beach-Ft. Pierce, FL</row>\n"
		outputString += "<row label=\"r554\">554 Wheeling, WV-Steubenville, OH</row>\n"
		outputString += "<row label=\"r627\">627 Wichita Falls, TX-Lawton, OK</row>\n"
		outputString += "<row label=\"r678\">678 Wichita-Hutchinson, KS Plus</row>\n"
		outputString += "<row label=\"r577\">577 Wilkes Barre-Scranton, PA</row>\n"
		outputString += "<row label=\"r550\">550 Wilmington, NC</row>\n"
		outputString += "<row label=\"r810\">810 Yakima-Pasco-Richland-Kennewick, WA</row>\n"
		outputString += "<row label=\"r536\">536 Youngstown, OH</row>\n"
		outputString += "<row label=\"r771\">771 Yuma, AZ-El Centro, CA</row>\n"
		outputString += "<row label=\"r596\">596 Zanesville, OH</row>\n"
		outputString += "<row label=\"r9999\">Other</row>\n"
		outputString += "</radio>"
	
	# Text question: Phone number
	elif var_questionGeneratorValue.get() == lst_questionGeneratorOptions[27]:
		outputString += "<text label=\"Q#\" optional=\"0\" size=\"10\" verify=\"phoneUS\" pii=\"4\">\n"
		outputString += "<title>What is your phone number?</title>\n"
		outputString += "</text>"
		
	else:
		outputString = "This has not been implemented yet."
		
	# If "Include <suspend/> tag at end" is checked.
	if var_questionGeneratorSuspend.get() == 1:
		outputString += "\n\n<suspend/>"
		
	# If "Replace Q# with this label" is checked.
	if var_questionGeneratorReplace.get() == 1:
		outputString = outputString.replace("Q#", var_questionGeneratorReplaceText.get())
	
	textarea.delete(1.0, END)
	textarea.insert(END, outputString)
	
	# If "Append all output to this file" is checked:
	if var_questionGeneratorAppendFile.get() == 1:
		writeToFile(var_questionGeneratorFilename.get(), textarea)
		
def questionGenerateAndCopy(textarea):
	questionGenerate(textarea)
	root.clipboard_clear()
	copyText = textarea.get(1.0, END)
	root.clipboard_append(copyText)
	textarea.insert(1.0, "The below was copied to the clipboard:\n======================================\n")
	
def writeToFile(filename, textarea):
	if filename != "":
		try:
			myfile = open(filename, "a")
			textToWrite = textarea.get(1.0, END)
			myfile.write(textToWrite + "\n\n")
			myfile.close()
			textarea.insert(1.0, "The below was appended to " + filename + ":\n======================================\n")
		except Exception:
			textarea.insert(1.0, "Could not open specified file.\n======================================\n")
	else:
		textarea.insert(1.0, "Could not write to file; no filename specified.\n======================================\n")
	
def elementGenerate(inputTextArea, outputTextArea):
	rawInput = inputTextArea.get(1.0, END)
	rawInput = rawInput.strip()
	elementType = ""
	elementPrefix = ""
	splitInput = []
	outputString = ""
	actionSelected = "Creating"
	
	# Creating.
	if var_elementGeneratorValue.get() in [lst_elementGeneratorOptions[0], lst_elementGeneratorOptions[1], lst_elementGeneratorOptions[2], lst_elementGeneratorOptions[3]]:
		actionSelected = "Creating"
	
	# Converting.
	elif var_elementGeneratorValue.get() in [lst_elementGeneratorOptions[4], lst_elementGeneratorOptions[5], lst_elementGeneratorOptions[6], lst_elementGeneratorOptions[7]]:
		actionSelected = "Converting"
		
	# Swapping.
	elif var_elementGeneratorValue.get() in [lst_elementGeneratorOptions[8]]:
		actionSelected = "Swapping"
	
	
	if actionSelected == "Creating":
	
		# If creating rows.
		if var_elementGeneratorValue.get() == lst_elementGeneratorOptions[0]:
			elementType = "row"
			elementPrefix = "r"
		
		# If creating cols.
		elif var_elementGeneratorValue.get() == lst_elementGeneratorOptions[1]:
			elementType = "col"
			elementPrefix = "c"
		
		# If creating choices.
		elif var_elementGeneratorValue.get() == lst_elementGeneratorOptions[2]:
			elementType = "choice"
			elementPrefix = "ch"
			
		# If creating groups.
		elif var_elementGeneratorValue.get() == lst_elementGeneratorOptions[3]:
			elementType = "group"
			elementPrefix = "g"
		
		# If delimited by lines.
		if var_elementGeneratorDelimeterValue.get() == lst_elementGeneratorDelimiterOptions[0]:
			splitInput = rawInput.split("\n")
		
		# If delimited by tabs.
		elif var_elementGeneratorDelimeterValue.get() == lst_elementGeneratorDelimiterOptions[1]:
			splitInput = rawInput.split("\t")
		
		# If delimited by commas.
		elif var_elementGeneratorDelimeterValue.get() == lst_elementGeneratorDelimiterOptions[2]:
			splitInput = rawInput.split(",")
				
		# Remove leading and trailing whitespace, fix &/</> characters, and split each item in splitInput by tabs and if the length is 2, take only the second part.
		for i in range(0, len(splitInput)):
			splitInput[i] = splitInput[i].strip()
			splitInput[i] = splitInput[i].replace("&", "&amp;")
			splitInput[i] = splitInput[i].replace("<", "&lt;")
			splitInput[i] = splitInput[i].replace(">", "&gt;")
			
			secondSplitInput = splitInput[i].split("\t")
			if len(secondSplitInput) == 2:
				splitInput[i] = secondSplitInput[1].strip()
		
		# Get the starting index number.
		try:
			startingIndex = int(var_elementGeneratorStartingIndex.get())
		except ValueError:
			startingIndex = 1
		
		# Build the output string.
		for j in range(0, len(splitInput)):
			outputString += "<"
			outputString += elementType
			outputString += " label=\""
			outputString += elementPrefix
			
			# If reversing index order.
			if var_elementGeneratorReverseOrder.get() == 1:
				outputString += str(len(splitInput) + startingIndex - (j + 1))
			else:
				outputString += str(j + startingIndex)
			
			outputString += "\""
			
			# If including values.
			if var_elementGeneratorIncludeValues.get() == 1:
				outputString += " value=\""
				
				# If reversing index order.
				if var_elementGeneratorReverseOrder.get() == 1:
					outputString += str(len(splitInput) + startingIndex - (j + 1))
				else:
					outputString += str(j + startingIndex)
				
				outputString += "\""
			
			isOEorExclusive = False
			
			# If detecting OE.
			if var_elementGeneratorDetectOE.get() == 1:
				lowerCaseInput = splitInput[j].lower()
				if "specify" in lowerCaseInput:
					isOEorExclusive = True
					outputString += " open=\"1\""
			
			# If detecting exclusive.
			if var_elementGeneratorDetectEXC.get() == 1:
				lowerCaseInput = splitInput[j].lower()
				if "exclusive" in lowerCaseInput or "none of these" in lowerCaseInput or "none of the above" in lowerCaseInput:
					isOEorExclusive = True
					outputString += " exclusive=\"1\""
			
			# If anchoring OEs/exclusives.
			if var_elementGeneratorAnchor.get() == 1 and isOEorExclusive:
				outputString += " randomize=\"0\""
			
			# If removing text within brackets.
			# THIS NEEDS SOME WORK
			if var_elementGeneratorRemoveBrackets.get() == 1:
				splitInput[j] = re.sub(r"\[([A-Za-z0-9_]+)\]", "", splitInput[j])
			
			splitInput[j] = splitInput[j].strip()
			
			outputString += ">"
			outputString += splitInput[j]
			outputString += "</"
			outputString += elementType
			outputString += ">\n"
	
	elif actionSelected == "Converting":
	
		# If converting to rows.
		if var_elementGeneratorValue.get() == lst_elementGeneratorOptions[4]:
			elementType = "row"
			elementPrefix = "r"
		
		# If converting to cols.
		elif var_elementGeneratorValue.get() == lst_elementGeneratorOptions[5]:
			elementType = "col"
			elementPrefix = "c"
		
		# If converting to choices.
		elif var_elementGeneratorValue.get() == lst_elementGeneratorOptions[6]:
			elementType = "choice"
			elementPrefix = "ch"
			
		# If converting to groups.
		elif var_elementGeneratorValue.get() == lst_elementGeneratorOptions[7]:
			elementType = "group"
			elementPrefix = "g"
			
		# If delimited by lines.
		if var_elementGeneratorDelimeterValue.get() == lst_elementGeneratorDelimiterOptions[0]:
			splitInput = rawInput.split("\n")
		
		# If delimited by tabs.
		elif var_elementGeneratorDelimeterValue.get() == lst_elementGeneratorDelimiterOptions[1]:
			splitInput = rawInput.split("\t")
		
		# If delimited by commas.
		elif var_elementGeneratorDelimeterValue.get() == lst_elementGeneratorDelimiterOptions[2]:
			splitInput = rawInput.split(",")
			
		for i in splitInput:
			i = i.replace("<row", "<" + elementType)
			i = i.replace("<col", "<" + elementType)
			i = i.replace("<choice", "<" + elementType)
			i = i.replace("<group", "<" + elementType)
			i = i.replace("</row", "</" + elementType)
			i = i.replace("</col", "</" + elementType)
			i = i.replace("</choice", "</" + elementType)
			i = i.replace("</group", "</" + elementType)
			i = i.replace("label=\"r", "label=\"" + elementPrefix)
			i = i.replace("label=\"c", "label=\"" + elementPrefix)
			i = i.replace("label=\"ch", "label=\"" + elementPrefix)
			i = i.replace("label=\"chh", "label=\"" + elementPrefix)
			i = i.replace("label=\"g", "label=\"" + elementPrefix)
			outputString += (i + "\n")

	elif actionSelected == "Swapping":
	
		# If delimited by lines.
		if var_elementGeneratorDelimeterValue.get() == lst_elementGeneratorDelimiterOptions[0]:
			splitInput = rawInput.split("\n")
		
		# If delimited by tabs.
		elif var_elementGeneratorDelimeterValue.get() == lst_elementGeneratorDelimiterOptions[1]:
			splitInput = rawInput.split("\t")
		
		# If delimited by commas.
		elif var_elementGeneratorDelimeterValue.get() == lst_elementGeneratorDelimiterOptions[2]:
			splitInput = rawInput.split(",")
		
		typesIncludedL = []
		typesIncludedS = []
		
		for i in splitInput:
			if "<row" in i and "/<row>" and not("r" in typesIncludedS):
				typesIncludedS.append("r")
				typesIncludedL.append("row")
			elif "<col" in i and "/<col>" and not("c" in typesIncludedS):
				typesIncludedS.append("c")
				typesIncludedL.append("col")
			elif "<choice" in i and "/<choice>" and not("ch" in typesIncludedS):
				typesIncludedS.append("ch")
				typesIncludedL.append("choice")
			elif "<group" in i and "/<group>" and not("g" in typesIncludedS):
				typesIncludedS.append("g")
				typesIncludedL.append("group")
				
		if len(typesIncludedL) != 2:
			outputString = "Error: This feature requires exactly 2 types of elements"
			
		else:
			type1 = typesIncludedL[0]
			type2 = typesIncludedL[1]
			type1S = typesIncludedS[0]
			type2S = typesIncludedS[1]
			
			for i in splitInput:
				if ("<" + type1) in i:
					i = i.replace("<" + type1, "<" + type2)
					i = i.replace("</" + type1, "</" + type2)
					i = i.replace("label=\"" + type1S, "label=\"" + type2S)
				elif ("<" + type2) in i:
					i = i.replace("<" + type2, "<" + type1)
					i = i.replace("</" + type2, "</" + type1)
					i = i.replace("label=\"" + type2S, "label=\"" + type1S)
				outputString += (i + "\n")
	
	else:
		outputString = "This feature has not been implemented yet."
		
	outputString = outputString.strip()
	outputTextArea.delete(1.0, END)
	outputTextArea.insert(END, outputString)

def elementGenerateAndCopy(inputTextArea, outputTextArea):
	elementGenerate(inputTextArea, outputTextArea)
	root.clipboard_clear()
	copyText = outputTextArea.get(1.0, END)
	root.clipboard_append(copyText)
	outputTextArea.insert(1.0, "The below was copied to the clipboard:\n======================================\n")

def elementClear(inputTextArea):
	inputTextArea.delete(1.0, END)
	
def elementResetDefaults(inputTextArea):
	var_elementGeneratorStartingIndex.set("1")
	var_elementGeneratorIncludeValues.set("1")
	var_elementGeneratorRemoveBrackets.set("1")
	var_elementGeneratorDetectOE.set("1")
	var_elementGeneratorDetectEXC.set("1")
	var_elementGeneratorReverseOrder.set("0")
	var_elementGeneratorAnchor.set("0")
	var_elementGeneratorValue.set(lst_elementGeneratorOptions[0])
	var_elementGeneratorDelimeterValue.set(lst_elementGeneratorDelimiterOptions[0])
	


	
#==================================================
# RESOURCE DEFINITIONS
#==================================================
str_version = "1.020 \"Management Influence\""
str_date = "17 October 2017"
str_titleText = "Ed's Decipher element generator v. " + str_version + " - Python Version - " + str_date

str_questionGeneratorTitle = "Question Generator"
str_questionGeneratorPrompt = "Select a question type:"
str_questionGeneratorBtnGenerate = "Generate"
str_questionGeneratorBtnGenerateAndCopy = "Generate and Copy to Clipboard"
str_questionGeneratorChkSuspend = "Include <suspend/> tag at end"
str_questionGeneratorChkReplace = "Replace \"Q#\" with this label:"
str_questionGeneratorAppendOutput = "Append all output to this file:"
str_questionGeneratorBrowseFile = "Browse..."

str_elementGeneratorTitle = "Element Generator"
str_elementGeneratorPrompt = "Select an element type:"
str_elementGeneratorInput = "Input"
str_elementGeneratorOutput = "Output"
str_elementGeneratorDelimiter = "Delimeter:"
str_elementGeneratorBtnGenerate = "Generate"
str_elementGeneratorBtnGenerateAndCopy = "Generate and Copy to Clipboard"
str_elementGeneratorBtnClear = "Clear"
str_elementGeneratorBtnDefault = "Reset Defaults"
str_elementGeneratorStartingIndex = "Starting index:"
str_elementGeneratorIncludeValues = "Include values"
str_elementGeneratorRemoveBrackets = "Remove text within [] brackets"
str_elementGeneratorReverseOrder = "Reverse index order"
str_elementGeneratorDetectOE = "Detect open end"
str_elementGeneratorDetectEXC = "Detect exclusive"
str_elementGeneratorAnchor = "Anchor OEs/exclusives"

# IMPORTANT: Add new options at the end of the lists.
lst_questionGeneratorOptions = [
	"Generic Radio Question",
	"Generic Checkbox Question",
	"Generic Select (Dropdown) Question",
	"Generic Number Question",
	"Generic Text Question",
	"Generic Textarea Question",
	"HTML element",
	"Radio Question: Yes/No",
	"Radio Question: Gender",
	"Radio Question: Age",
	"Radio Question: Income",
	"Radio Question: Ethnicity",
	"Radio Question: US State",
	"Radio Question: US State with region punch",
	"Radio Question: 0-5 Scale",
	"Radio Question: 1-5 Scale",
	"Radio Question: 0-7 Scale",
	"Radio Question: 1-7 Scale",
	"Radio Question: 0-10 Scale",
	"Radio Question: 1-10 Scale",
	"Checkbox Question: Ethnicity",
	"Select Question: US State",
	"Select Question: US State with region punch",
	"Number Question: Age",
	"Number Question: Age with age group punch",
	"Text Question: Zipcode",
	"Text Question: Zipcode with DMA template",
	"Text Question: Phone Number"
]

lst_elementGeneratorOptions = [
	"Create Rows",
	"Create Columns",
	"Create Choices",
	"Create Groups",
	"Convert to Rows",
	"Convert to Columns",
	"Convert to Choices",
	"Convert to Groups",
	"Swap Element Types"
]

lst_elementGeneratorDelimiterOptions = [
	"Lines",
	"Tabs",
	"Commas"
]

#==================================================
# MAIN CODE
#==================================================

root = Tk()
root.wm_title("Decipher Element Generator")
root.geometry("1024x830+0+0")

# Intro text.
lbl_titleText = Label(text=str_titleText, justify=LEFT, font="Consolas 10").place(x = 10, y = 10)

# Question element generator.
lbl_questionGeneratorTitle = Label(text=str_questionGeneratorTitle, justify=LEFT, font="Consolas 10").place(x = 10, y = 50)
lbl_questionGeneratorPrompt = Label(text=str_questionGeneratorPrompt, justify=LEFT, font="Consolas 10").place(x = 10, y = 70)
var_questionGeneratorValue = StringVar(root)
var_questionGeneratorValue.set(lst_questionGeneratorOptions[0])
opt_questionGeneratorOptionSelector = OptionMenu(*(root, var_questionGeneratorValue) + tuple(lst_questionGeneratorOptions)).place(x = 180, y = 60)
#opt_questionGeneratorOptionSelector.config(font=('Consolas',(10)))
txt_questionGeneratorTextOutput = Text(root, height=16, width=120)
txt_questionGeneratorTextOutput.place(x = 10, y = 150)
btn_questionGeneratorBtnGenerate = Button(root, text=str_questionGeneratorBtnGenerate, command=lambda: questionGenerate(txt_questionGeneratorTextOutput), font="Consolas 10").place(x = 10, y = 90)
btn_questionGeneratorBtnGenerateAndCopy = Button(root, text=str_questionGeneratorBtnGenerateAndCopy, command=lambda: questionGenerateAndCopy(txt_questionGeneratorTextOutput), font="Consolas 10").place(x = 80, y = 90)
var_questionGeneratorSuspend = IntVar()
chk_questionGeneratorSuspend = Checkbutton(root, text=str_questionGeneratorChkSuspend, variable=var_questionGeneratorSuspend, font="Consolas 10").place(x = 310, y = 90)
var_questionGeneratorReplace = IntVar()
chk_questionGeneratorReplace = Checkbutton(root, text=str_questionGeneratorChkReplace, variable=var_questionGeneratorReplace, font="Consolas 10").place(x = 550, y = 90)
var_questionGeneratorReplaceText = StringVar()
ent_questionGeneratorReplace = Entry(root, width=5, textvariable=var_questionGeneratorReplaceText, font="Consolas 10").place(x = 780, y = 90)

var_questionGeneratorAppendFile = IntVar()
chk_questionGeneratorAppendFile = Checkbutton(root, text=str_questionGeneratorAppendOutput, variable=var_questionGeneratorAppendFile, font="Consolas 10").place(x = 10, y = 120)
var_questionGeneratorFilename = StringVar()
var_questionGeneratorFilename.set("output.xml")
ent_questionGeneratorFilename = Entry(root, width=48, textvariable=var_questionGeneratorFilename, font="Consolas 10").place(x = 255, y = 120)

# Row/col/choice generator.
lbl_elementGeneratorTitle = Label(text=str_elementGeneratorTitle, justify=LEFT, font="Consolas 10").place(x = 10, y = 420)
lbl_elementGeneratorPrompt = Label(text=str_elementGeneratorPrompt, justify=LEFT, font="Consolas 10").place(x = 10, y = 440)
var_elementGeneratorValue = StringVar(root)
var_elementGeneratorValue.set(lst_elementGeneratorOptions[0])
opt_elementGeneratorOptionSelector = OptionMenu(*(root, var_elementGeneratorValue) + tuple(lst_elementGeneratorOptions)).place(x = 180, y = 430)
#opt_elementGeneratorOptionSelector.config(font=('Consolas',(10)))
btn_elementGeneratorBtnGenerate = Button(root, text=str_elementGeneratorBtnGenerate, command=lambda: elementGenerate(txt_elementGeneratorTextInput, txt_elementGeneratorTextOutput), font="Consolas 10").place(x = 10, y = 460)
txt_elementGeneratorTextInput = Text(root, height=16, width=58)
txt_elementGeneratorTextInput.place(x = 10, y = 550)
txt_elementGeneratorTextOutput = Text(root, height=16, width=58)
txt_elementGeneratorTextOutput.place(x = 510, y = 550)
btn_elementGeneratorBtnGenerateAndCopy = Button(root, text=str_elementGeneratorBtnGenerateAndCopy, command=lambda: elementGenerateAndCopy(txt_elementGeneratorTextInput, txt_elementGeneratorTextOutput), font="Consolas 10").place(x = 80, y = 460)
btn_elementGeneratorBtnClear = Button(root, text=str_elementGeneratorBtnClear, command=lambda: elementClear(txt_elementGeneratorTextInput), font="Consolas 10").place(x = 430, y = 520)
btn_elementGeneratorResetDefaults = Button(root, text=str_elementGeneratorBtnDefault, command=lambda: elementResetDefaults(txt_elementGeneratorTextInput), font="Consolas 10").place(x = 315, y = 520)
lbl_elementGeneratorInput = Label(text=str_elementGeneratorInput, justify=LEFT, font="Consolas 10").place(x = 10, y = 527)
lbl_elementGeneratorInputDelimeter = Label(text=str_elementGeneratorDelimiter, justify=LEFT, font="Consolas 10").place(x = 80, y = 527)
var_elementGeneratorDelimeterValue = StringVar(root)
var_elementGeneratorDelimeterValue.set(lst_elementGeneratorDelimiterOptions[0])
opt_elementGeneratorDelimeterOptionSelector = OptionMenu(*(root, var_elementGeneratorDelimeterValue) + tuple(lst_elementGeneratorDelimiterOptions)).place(x = 160, y = 517)
#opt_elementGeneratorDelimeterOptionSelector.config(font=('Consolas',(10)))
lbl_elementGeneratorOutput = Label(text=str_elementGeneratorOutput, justify=LEFT, font="Consolas 10").place(x = 510, y = 527)
lbl_elementGeneratorStartingIndex = Label(text=str_elementGeneratorStartingIndex , justify=LEFT, font="Consolas 10").place(x = 310, y = 462)
var_elementGeneratorStartingIndex = StringVar()
var_elementGeneratorStartingIndex.set("1")
ent_elementGeneratorStartingIndex = Entry(root, width=4, textvariable=var_elementGeneratorStartingIndex, font="Consolas 10").place(x = 423, y = 462)
var_elementGeneratorIncludeValues = IntVar()
var_elementGeneratorIncludeValues.set("1")
chk_elementGeneratorIncludeValues = Checkbutton(root, text=str_elementGeneratorIncludeValues, variable=var_elementGeneratorIncludeValues, font="Consolas 10").place(x = 463, y = 460)
var_elementGeneratorRemoveBrackets = IntVar()
var_elementGeneratorRemoveBrackets.set("1")
chk_elementGeneratorRemoveBrackets = Checkbutton(root, text=str_elementGeneratorRemoveBrackets, variable=var_elementGeneratorRemoveBrackets, font="Consolas 10").place(x = 753, y = 460)
var_elementGeneratorReverseOrder = IntVar()
chk_elementGeneratorReverseOrder = Checkbutton(root, text=str_elementGeneratorReverseOrder, variable=var_elementGeneratorReverseOrder, font="Consolas 10").place(x = 593, y = 460)
var_elementGeneratorDetectOE = IntVar()
var_elementGeneratorDetectOE.set("1")
chk_elementGeneratorDetectOE = Checkbutton(root, text=str_elementGeneratorDetectOE, variable=var_elementGeneratorDetectOE, font="Consolas 10").place(x = 10, y = 490)
var_elementGeneratorDetectEXC = IntVar()
var_elementGeneratorDetectEXC.set("1")
chk_elementGeneratorDetectEXC = Checkbutton(root, text=str_elementGeneratorDetectEXC, variable=var_elementGeneratorDetectEXC, font="Consolas 10").place(x = 145, y = 490)
var_elementGeneratorAnchor = IntVar()
chk_elementGeneratorAnchor = Checkbutton(root, text=str_elementGeneratorAnchor, variable=var_elementGeneratorAnchor, font="Consolas 10").place(x = 285, y = 490)

root.mainloop()
