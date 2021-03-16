import re
import json

f=open('data/party.txt',"r")
data=f.read().split("\n")
#print(data)
# print(type(data))

lst=[]
for item in data:
    party={}
    items=item.split(",")
    #print(items)
    party["party_id"]=items[0]
    party["party_name"]=items[1]
    party["party_code"]=items[2]
    party["alliance"]=items[3]
    #party[items[1]]=items[0]
    lst.append(party)
#print(lst)


with open('JSON/party.json', 'w') as json_file:
    json.dump(lst, json_file)
    print("Data extracted to JSON/party.json")
    
