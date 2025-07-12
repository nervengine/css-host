
<term cond="" label="term"> :  </term>

  optional="1" where="execute,survey,report" translateable="0"

++SINGLE QUESTION SET:
qbrandspick.val = qbrandspick.r2.index # qbrandspick choice 2 is now selected
++MULTI QUESTION SET:
qbrandspick.r2.val = 1 # qbrandspick choice 2 is now selected

++CHECK IF SINGLE IS SELECTED:
dQ2.selected.text # '0-17' '18-25' '26-35'
dQ2.selected.label # r1 r2 r3


<res label="pre_percentage"></res>
<res label="post_percentage">%</res>
 ss:preText="${res.pre_percentage}" ss:postText="${res.post_percentage}"



  size="3"
  optional="0"
  ss:postText=""
  ss:preText=""
  verify="range(0,100)"
  uses="autosum.5"
  amount="100"
  autosum:prefill="0"
  autosum:preText="${res.pre_percentage}"
  autosum:postText="${res.post_percentage}"

<res label="Q2Error">You are not allowed, you party too much.  Enter a different age!</res>
<validate>
if Q2.val==21:
	error(res.Q2Error)
</validate>




<quota overquota="noqual" sheet="QUTOANAME" label="qt_QUTOANAME" cond="1" />
<suspend/>


<exec>
####start picker code

print p.markers

##ENABLE FOR CHECKBOX ONLY
#for eachRow in dQ#.rows:
#  eachRow.val = None

for eachRow in dQ#.rows:
    if hasMarker('/QUTOANAME/qualifedquota_%s' %eachRow.label):
        #eachRow.val = 1 #multi
        #dQ#.val = eachRow.index #single

####end picker code
</exec>


agerange = "65-100" if eachRow.label=='r7' else eachRow.text #TERNARY operator

 open="1" openSize="25" randomize="0"


<block label="Q17_Q19_block" cond="1">
</block>


 verify="range(1, 100)"


<style name="question.after"><![CDATA[
<script>
$ (':text').attr('maxlength','3');
$ (':text').attr('size','3');
</script>
]]></style>



<style name="question.after"><![CDATA[
	<script>
$ (document).ready(function(){
  setTimeout( function() {
    
  }, 100);
});
  </script>
]]>
</style>


<style name="question.after"><![CDATA[
<style>
.answers.answers-list {
    color: #454545;
    font-size: 1.3rem;
    font-family: Arial,sans-serif;
    }
</style>
]]></style>









 ss:rowClassNames="qsraEngagedLength-1"
 
.attr('%s' %(eachRow.label) )
 
 
 