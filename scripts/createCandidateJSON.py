import re
import json

f=open('data/candidates.txt',"r")
data=f.read().split("\n")

#print(data)
partyfile=open('JSON/party.json',"r")
partyJSON=partyfile.read()
partylist = json.loads(partyJSON)

#create partymap with code as key
partymap={}
newlist=[]

for party in partylist:
    partymap[party['party_code'].lower()]=party

#print(partymap)

for items in data:
    item=items.split(",")
    if(len(item)>1):
        constituency={}
        constituency['constituency_id']=item[0]
        constituency['constituency_name']=item[1]
        candidates=[]
        #print(item[0])
        for i in range(2,len(item)-1,2):
            candidate={}
            party_code=item[i].lower()
            candidate['candidate_name']=item[i+1]
            candidate['party_code']=item[i]
            if(party_code in partymap):
                #print(partymap[party_code])
                myparty=partymap[party_code]
                candidate['party_name']=myparty["party_name"]
                candidate['party_id']=myparty["party_id"]
                candidate['alliance']=myparty["alliance"]
            else:
                candidate['party_name']=""
                candidate['party_id']="-1"
                candidate['alliance']=""
            #print("")
            candidates.append(candidate)
        #print(candidates)
        constituency['candidates']=candidates
        #print(item[0],len(candidates))
        newlist.append(constituency)

#print(newlist)

with open('JSON/candidates.json', 'w') as json_file:
     json.dump(newlist, json_file)
     print("Data extracted to JSON/candidates.json")

