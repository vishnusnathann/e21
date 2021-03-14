import re
import json

def filterCharacters(text):
    #return re.sub('(…)', "",text).strip()
    return re.sub('[^A-Za-z0-9\'\.\"()]',' ',text)

f=open('data.txt',"r")
data=f.read().split("-")
#print(data)
# print(type(data))


lst=[]
for item in data:
    t=[]
    i=1
    lines=item.split("\n")
    if(len(lines)>1):
        for line in lines:
            content=filterCharacters(line).strip()
            i+=1
            t.append(content)
        t.pop()
        t.pop(0)
        #print(t)
        lst.append(t)

newlist=[]

for item in lst:
    if(len(item)>1):
        constituency={}
        constituency['constituency_id']=item[0]
        constituency['constituency_name']=item[1]
        candidates=[]
        #print(item[0])
        for i in range(2,len(item),2):
            candidate={}
            #print("party_name: ",item[i])
            candidate['party_name']=item[i]
            if(i+1<len(item)):
                #print("candidate_name: ",item[i+1])
                candidate['candidate_name']=item[i+1]
            #print("")
            candidates.append(candidate)
        #print(candidates)
        constituency['candidates']=candidates
        #print(item[0],len(candidates))
        newlist.append(constituency)

#json_data=json.dumps(newlist)

with open('data.json', 'w') as json_file:
    json.dump(newlist, json_file)
    print("JSON extracted to data.json")
    
