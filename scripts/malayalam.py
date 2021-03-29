import re
import json


mf=open('data/malayalam.txt',"r",encoding="utf8")
f=open('data/candidates.txt',"r")

data=f.read().split("\n")
mdata=mf.read().split("\n")

# print(datam)
partyfile=open('JSON/party.json',"r")
partyJSON=partyfile.read()
partylist = json.loads(partyJSON)

#create partymap with code as key
partymap={}
newlist=[]

for party in partylist:
    partymap[party['party_code'].lower()]=party

#print(partymap)
others={}
others['candidate_name']="Others"
others['candidate_mname']="മറ്റുള്ളവർ"
others['party_code']="Oth."
others['party_name']="Others"
others['party_id']="30"
others['alliance']="4"

mindex=0
for items in data:
    mitems=mdata[mindex]
    # if(mindex==141):
    #     break
    item=items.split(",")
    mitem=mitems.split(",")
    if(len(item)>1):
        constituency={}
        constituency['constituency_id']=item[0]
        constituency['constituency_name']=item[1]
        constituency['constituency_mname']=mitem[1]
        # print(mitem[1])
        candidates=[]
        #print(item[0])
        for i in range(2,len(item)-1,2):
            candidate={}
            party_code=item[i].lower()
            candidate['candidate_name']=item[i+1]
            candidate['candidate_mname']=mitem[i+1]
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
        candidates.append(others)
        constituency['candidates']=candidates
        #print(item[0],len(candidates))
        newlist.append(constituency)
    mindex+=1

#print(newlist)

with open('JSON/candidates.json', 'w', encoding='utf8') as json_file:
     json.dump(newlist, json_file, ensure_ascii=False)
     print("Data extracted to JSON/candidates.json")

# print(newlist) {constituency : "Kannur",district : "Kannur"},
# for items in newlist:
#     print('{constituency : "%s", constituency_mal :"%s"},'%(items["constituency_name"],items["constituency_mname"]))
