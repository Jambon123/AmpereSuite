import requests
from time import sleep
import xml.etree.ElementTree as ET
import csv
from collections import Counter

user = input("Enter Your Main Nation: ")
headers = {'User-Agent':'{} Using N-Stats 2.0 by DragoE'}

with open("Serverside\Data\puppets_list.txt") as file:
    puppets = file.readlines()

puppets = [x.rstrip() for x in puppets]

print("\nYou Used {} Puppets This Year\n".format(len(puppets)))

columns = ["Nation","Intercepts","Leftover Nukes","Leftover Prod","Rads","Leftover Sheilds","Specialty","Strikes"]
table = []
i = 0

for nation in puppets:
    try:
        response = requests.get("https://www.nationstates.net/cgi-bin/api.cgi?nation={}&q=nstats".format(nation.lower().replace(" ","_")),headers=headers)
        sleep(0.7)
        response.raise_for_status()
    except Exception as e:
        print(e)
        if input("Continue Anyways? (y/n): ").lower() == "y":
            continue
        else:
            break
    tree = ET.fromstring(response.text)
    new_row = [nation]
    for element in tree.iter():
        if element.text == "\n":
            continue
        new_row.append(element.text)
    if len(new_row) < 8:
        print("Nation {} has no findable stats!".format(nation))
    else:
        print("{} - {} Intercepts - {} Leftover Nukes - {} Leftover Prod - {} Rads - {} Leftover Sheilds - {} Specialty - {} Strikes".format(*new_row))
        table.append(new_row)

columns_to_sum = [1,2,3,4,5,7]
sum_data = [sum(float(row[col]) for row in table) for col in columns_to_sum]
print("\n FINAL TOTALS: {} Intercepts - {} Leftover Nukes - {} Leftover Prod - {} Rads - {} Leftover Sheilds - {} Strikes\n".format(*sum_data))

specs = [row[6] for row in table]
print("Specialties: ",dict(Counter(specs)),"\n")

if input("Export Stats CSV File? (y/n): ").lower() == "y":
    with open("n_stats.csv","w+") as file:
        csv_writer = csv.writer(file)
        csv_writer.writerow(columns)
        csv_writer.writerows(table)