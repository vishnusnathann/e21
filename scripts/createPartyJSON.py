import re
import json

# def filterCharacters(text):
#     #return re.sub('(…)', "",text).strip()
#     return re.sub('[^A-Za-z0-9\'\.\"()]',' ',text)

f=open('partyData.txt',"r")
data=f.read().split("\n")
#print(data)
# print(type(data))

lst=[]
party={}
for item in data:
    items=item.split(" | ")
    #party[items[0]]=items[1]
    party[items[1]]=items[0]
print(party)

with open('partyData.json', 'w') as json_file:
    json.dump(party, json_file)
    print("JSON extracted")
    
