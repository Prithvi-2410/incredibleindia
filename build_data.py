import pandas as pd
import json
import os

file_path = "Data set of famous India tourist places along with there images.xlsx"
df = pd.read_excel(file_path)

# Normalize state spellings
state_corrections = {
    'Maharastra': 'Maharashtra',
}
df['State'] = df['State'].replace(state_corrections)

# Normalize Zone
df['Zone'] = df['Zone'].str.strip()
zone_corrections = {
    'North Eastern': 'North East',
    'North-Eastern': 'North East'
}
df['Zone'] = df['Zone'].replace(zone_corrections)

# Exact Indian Union Territories as of 2026 (8 Union Territories)
UNION_TERRITORIES = {
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Andaman and Nicobar Islands',
    'Puducherry',
    'Daman and Diu',
    'Chandigarh',
    'Lakshadweep'
}

# Real local images requested by user
CUSTOM_IMAGE_OVERRIDES = {
    'dest-005': '/images/Somnath-Temple-1000x565.webp', # Somnath Temple
    'dest-006': '/images/Jallianwala-Bagh.jpg',          # Jallianwala Bagh
    'dest-007': '/images/wanga_border.webp',             # Wagah / Wanga Border
    'dest-008': '/images/Mahalaxmi-Temple.webp',         # Mahalakshmi Temple Kolhapur
    'dest-009': '/images/Mahakaleshwar Jyotirlinga Temple 2.jpg', # Mahakaleshwar Jyotirlinga
    'dest-010': 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1200&auto=format&fit=crop', # Orchha Fort / Sanctuary
    'dest-016': '/images/tungnath temple.jpg',           # Tungnath Temple
    'dest-019': '/images/Aundha-Nagnath-Temple-Timings-.jpg', # Augarnath Temple / Aundha Nagnath
    'dest-022': '/images/RADHA-KRISHNA-PREM-MANDIR.jpg', # Prem Mandir Vrindavan
    'dest-029': '/images/Shri-Kedarnath-Yatra-.jpg', # Kedarnath Temple
    'dest-030': '/images/Mahalaxmi-Temple.webp',         # Mahalaxmi Temple Mumbai
    'dest-032': '/images/dakshineswar-kali-temple-kolkata-february-beautiful-was-built-bengal-architecture-style-48501374.webp', # Dakshineswar Kali Temple
    'dest-034': '/images/shree-krishna-temple-dwarkadhish-temple-dwarka-gujarat-v0-xn0ua8ae4ybg1.webp', # Dwarkadhish Temple
    'dest-039': '/images/Shridi-Sai-baba-Temple.png', # Sai Baba Temple Shirdi
    'dest-044': '/images/church-at-ridge.jpg',          # The Ridge / Christ Church Shimla
    'dest-055': '/images/PURI.jpg',                      # Jagannath Temple / Puri
    'dest-057': '/images/meenakshi-temple1-1.jpg',       # Meenakshi Amman Temple Madurai
    'dest-071': '/images/Mahabodhi-Temple.jpg',         # Mahabodhi Temple Bodh Gaya
    'dest-077': '/images/SUNDER NURSERY.jpg',            # Sunder Nursery
    'dest-078': '/images/Gateway-of-india.jpg',         # Gateway of India
    'dest-083': '/images/Howrah Bridge Kolkata.jpg',     # Howrah Bridge
    'dest-111': '/images/TAJ-MAHAL.webp',                # Taj Mahal
    'dest-126': '/images/Guwahati.jpg',                 # Kamakhya Temple / Guwahati
    'dest-133': "/images/Delhi Humayun's Tomb.webp",     # Humayun's Tomb
    'dest-134': '/images/Delhi-Lotus-Temple-07.jpg',     # Lotus Temple
    'dest-138': '/images/qutub-minar-in-new-delhi-india-free-photo.jpg', # Qutub Minar
    'dest-139': '/images/Marine-drive.jpg',             # Marine Drive Mumbai
    'dest-206': '/images/kalima.jpg',                    # Kalighat Kali Temple
    'dest-237': '/images/BULAND-DARWAZA.webp',           # Buland Darwaza
    'dest-252': '/images/essel-world.jpg',              # Essel World Mumbai
    'dest-295': 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop', # Jahaz Mahal
    'dest-302': '/images/Imagica.jpg',                  # Imagicaa
}

CUSTOM_FALLBACK_OVERRIDES = {
    'dest-029': '/images/kedarnath-temple.webp',
    'dest-022': '/images/Prem-Mandir-Vrindavan1-1.jpg',
    'dest-007': '/images/Wagah-border-amritsar.webp',
    'dest-005': '/images/somnath-jyotirlinga-temple.jpg',
    'dest-016': '/images/tungnath temple3d.webp',
}

STATE_IMAGE_OVERRIDES = {
    'West Bengal': '/images/west-bengal.jpg',
    'Uttar Pradesh': '/images/uttar-pradesh.jpg',
    'Madhya Pradesh': '/images/Madhya Pradesh.webp',
    'Karnataka': '/images/KARNATAKA.jpg',
}

CITY_HERO_OVERRIDES = {
    'Puri': '/images/PURI.jpg',
    'Guwahati': '/images/Guwahati.jpg',
    'Shimla': '/images/church-at-ridge.jpg',
    'Madurai': '/images/meenakshi-temple1-1.jpg',
    'Bodh Gaya': '/images/Mahabodhi-Temple.jpg',
    'Mumbai': '/images/Gateway-of-india.jpg',
    'Amritsar': '/images/Jallianwala-Bagh.jpg',
}

# Coordinate approximations on India map (% x, % y on real India map image)
state_map_coords = {
    'Jammu and Kashmir': {'x': 32, 'y': 15},
    'Ladakh': {'x': 43, 'y': 11},
    'Himachal Pradesh': {'x': 38, 'y': 22},
    'Punjab': {'x': 31, 'y': 25},
    'Uttarakhand': {'x': 44, 'y': 25},
    'Haryana': {'x': 35, 'y': 29},
    'Delhi': {'x': 37, 'y': 31},
    'Rajasthan': {'x': 25, 'y': 36},
    'Uttar Pradesh': {'x': 49, 'y': 37},
    'Bihar': {'x': 63, 'y': 40},
    'Jharkhand': {'x': 62, 'y': 47},
    'West Bengal': {'x': 69, 'y': 49},
    'Sikkim': {'x': 69, 'y': 33},
    'Assam': {'x': 81, 'y': 36},
    'Arunachal Pradesh': {'x': 89, 'y': 28},
    'Tripura': {'x': 78, 'y': 46},
    'Odisha': {'x': 58, 'y': 56},
    'Madhya Pradesh': {'x': 42, 'y': 48},
    'Chhattisgarh': {'x': 53, 'y': 52},
    'Gujarat': {'x': 19, 'y': 46},
    'Maharashtra': {'x': 32, 'y': 58},
    'Goa': {'x': 27, 'y': 70},
    'Karnataka': {'x': 33, 'y': 73},
    'Andhra Pradesh': {'x': 44, 'y': 70},
    'Telangana': {'x': 43, 'y': 62},
    'Tamil Nadu': {'x': 40, 'y': 84},
    'Kerala': {'x': 34, 'y': 84},
    'Andaman and Nicobar Islands': {'x': 84, 'y': 80},
    'Puducherry': {'x': 45, 'y': 80},
    'Daman and Diu': {'x': 24, 'y': 52}
}

category_fallbacks = {
    'Temple': 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',
    'Beach': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
    'Fort': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
    'Lake': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    'National Park': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
    'Palace': 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop',
    'Waterfall': 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200&auto=format&fit=crop',
    'Monument': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop',
    'Cave': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    'Hill': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    'Valley': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    'Spiritual': 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1200&auto=format&fit=crop',
    'Heritage': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop',
    'Wildlife': 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop',
    'Adventure': 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1200&auto=format&fit=crop',
    'Default': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop'
}

def get_experience_category(t, s):
    t_str = str(t).lower()
    s_str = str(s).lower()
    if any(k in t_str for k in ['beach', 'island', 'promenade', 'coast']):
        return 'Beaches'
    elif any(k in t_str for k in ['temple', 'monastery', 'gurudwara', 'church', 'shrine', 'spiritual', 'ghat']) or 'religious' in s_str or 'spiritual' in s_str:
        return 'Spiritual'
    elif any(k in t_str for k in ['fort', 'palace', 'monument', 'memorial', 'mausoleum', 'tomb', 'stepwell', 'heritage']) or 'historical' in s_str or 'architectural' in s_str:
        return 'Heritage'
    elif any(k in t_str for k in ['national park', 'wildlife', 'sanctuary', 'zoo', 'bird']) or 'wildlife' in s_str:
        return 'Wildlife'
    elif any(k in t_str for k in ['hill', 'valley', 'lake', 'waterfall', 'mountain', 'peak', 'cave', 'dam', 'scenic', 'garden']) or 'nature' in s_str:
        return 'Nature'
    elif any(k in t_str for k in ['ski', 'trekking', 'adventure', 'gravity hill']) or 'adventure' in s_str:
        return 'Adventure'
    elif any(k in t_str for k in ['cultural', 'museum', 'village', 'film', 'market', 'orchard', 'vineyard']) or 'cultural' in s_str or 'artistic' in s_str:
        return 'Culture'
    else:
        return 'Experiences'

destinations = []
for idx, row in df.iterrows():
    dest_id = f"dest-{idx+1:03d}"
    t = str(row['Type']).strip()
    s = str(row['Significance']).strip()
    exp_cat = get_experience_category(t, s)
    
    fb = CUSTOM_FALLBACK_OVERRIDES.get(dest_id, category_fallbacks.get(t, category_fallbacks.get(exp_cat, category_fallbacks['Default'])))
    
    fee_val = row['Entrance Fee in INR']
    if pd.isna(fee_val) or fee_val == 0:
        fee_str = "Free Entry"
    else:
        fee_str = f"₹{int(fee_val)}"
        
    rating_val = float(row['Google review rating']) if not pd.isna(row['Google review rating']) else 4.5
    reviews_lakhs = float(row['Number of google review in lakhs']) if not pd.isna(row['Number of google review in lakhs']) else 0.5
    time_needed = float(row['time needed to visit in hrs']) if not pd.isna(row['time needed to visit in hrs']) else 2.0
    est_year = str(row['Establishment Year']) if not pd.isna(row['Establishment Year']) else "Ancient"
    if est_year == 'Unknown' or est_year == 'nan':
        est_year = "Timeless Heritage"
    
    weekly_off = str(row['Weekly Off']) if not pd.isna(row['Weekly Off']) else "Open All Days"
    if weekly_off == 'nan':
        weekly_off = "Open All Days"
        
    airport_nearby = str(row['Airport with 50km Radius']).strip()
    dslr = str(row['DSLR Allowed']).strip()
    best_time = str(row['Best Time to visit']).strip()
    
    city_name = str(row['City']).strip()
    state_name = str(row['State']).strip()
    place_name = str(row['Name']).strip()
    zone_name = str(row['Zone']).strip()
    
    # Check for image override
    img_url = CUSTOM_IMAGE_OVERRIDES.get(dest_id, str(row['Image URL']).strip())
    
    desc = f"{place_name} is a renowned {t.lower()} located in {city_name}, {state_name}. Revered for its {s.lower()} significance, this destination welcomes travelers seeking {exp_cat.lower()} amidst India's vibrant tapestry. Best visited during {best_time.lower()}, it offers an unforgettable experience with a rating of {rating_val}/5 from over {reviews_lakhs} lakh explorers."
    
    dest_item = {
        "id": dest_id,
        "name": place_name,
        "city": city_name,
        "state": state_name,
        "zone": zone_name,
        "isUnionTerritory": state_name in UNION_TERRITORIES,
        "type": t,
        "significance": s,
        "category": exp_cat,
        "establishmentYear": est_year,
        "timeNeededHrs": time_needed,
        "rating": rating_val,
        "reviewsLakhs": reviews_lakhs,
        "entranceFee": fee_str,
        "entranceFeeNum": int(fee_val) if not pd.isna(fee_val) else 0,
        "airportNearby": airport_nearby == 'Yes',
        "weeklyOff": weekly_off,
        "dslrAllowed": dslr == 'Yes',
        "bestTimeToVisit": best_time,
        "imageUrl": img_url,
        "fallbackImageUrl": fb,
        "description": desc
    }
    destinations.append(dest_item)

# Build City level aggregation
city_groups = {}
for d in destinations:
    c_name = d['city']
    if c_name not in city_groups:
        city_groups[c_name] = {
            "name": c_name,
            "state": d['state'],
            "zone": d['zone'],
            "isUnionTerritory": d['isUnionTerritory'],
            "places": [],
            "categories": set(),
            "avgRating": 0,
            "totalReviewsLakhs": 0,
            "bestTimes": set(),
            "heroImage": d['imageUrl'],
            "fallbackHeroImage": d['fallbackImageUrl'],
            "description": f"Experience the magic of {c_name}, nestled in {d['state']}. A captivating destination in {d['zone']} India renowned for cultural richness, historic wonders, and scenic serenity."
        }
    city_groups[c_name]['places'].append(d)
    city_groups[c_name]['categories'].add(d['category'])
    city_groups[c_name]['bestTimes'].add(d['bestTimeToVisit'])

cities_list = []
for c_name, c_data in city_groups.items():
    c_places = c_data['places']
    avg_r = round(sum(p['rating'] for p in c_places) / len(c_places), 1)
    tot_rev = round(sum(p['reviewsLakhs'] for p in c_places), 2)
    top_place = max(c_places, key=lambda x: (x['rating'], x['reviewsLakhs']))
    c_data['heroImage'] = CITY_HERO_OVERRIDES.get(c_name, top_place['imageUrl'])
    c_data['fallbackHeroImage'] = top_place['fallbackImageUrl']
    c_data['avgRating'] = avg_r
    c_data['totalReviewsLakhs'] = tot_rev
    c_data['categories'] = sorted(list(c_data['categories']))
    c_data['bestTimes'] = sorted(list(c_data['bestTimes']))
    c_data['placeCount'] = len(c_places)
    cities_list.append(c_data)

cities_list.sort(key=lambda x: (x['placeCount'], x['avgRating']), reverse=True)

# Build State level aggregation
state_groups = {}
for c in cities_list:
    s_name = c['state']
    if s_name not in state_groups:
        state_groups[s_name] = {
            "name": s_name,
            "zone": c['zone'],
            "isUnionTerritory": s_name in UNION_TERRITORIES,
            "entityType": "Union Territory" if s_name in UNION_TERRITORIES else "State",
            "cities": [],
            "placesCount": 0,
            "topPlaces": [],
            "heroImage": STATE_IMAGE_OVERRIDES.get(s_name, c['heroImage']),
            "fallbackHeroImage": c['fallbackHeroImage'],
            "coords": state_map_coords.get(s_name, {'x': 50, 'y': 50}),
            "description": f"Explore {s_name}, an extraordinary {'Union Territory' if s_name in UNION_TERRITORIES else 'State'} in {c['zone']} India celebrated for its grand traditions, diverse landscapes, and iconic attractions."
        }
    state_groups[s_name]['cities'].append(c['name'])
    state_groups[s_name]['placesCount'] += c['placeCount']
    for p in c['places']:
        state_groups[s_name]['topPlaces'].append(p)

states_list = []
for s_name, s_data in state_groups.items():
    s_data['topPlaces'].sort(key=lambda x: (x['rating'], x['reviewsLakhs']), reverse=True)
    if s_name in STATE_IMAGE_OVERRIDES:
        s_data['heroImage'] = STATE_IMAGE_OVERRIDES[s_name]
    elif s_data['topPlaces']:
        s_data['heroImage'] = s_data['topPlaces'][0]['imageUrl']
        s_data['fallbackHeroImage'] = s_data['topPlaces'][0]['fallbackImageUrl']
    s_data['topPlaces'] = [p['name'] for p in s_data['topPlaces'][:5]]
    s_data['cityCount'] = len(s_data['cities'])
    states_list.append(s_data)

states_list.sort(key=lambda x: x['placesCount'], reverse=True)

# Build Zones
zone_groups = {}
for s in states_list:
    z_name = s['zone']
    if z_name not in zone_groups:
        zone_groups[z_name] = {
            "name": z_name,
            "states": [],
            "cityCount": 0,
            "placeCount": 0,
            "heroImage": s['heroImage'],
            "fallbackHeroImage": s['fallbackHeroImage']
        }
    zone_groups[z_name]['states'].append(s['name'])
    zone_groups[z_name]['cityCount'] += s['cityCount']
    zone_groups[z_name]['placeCount'] += s['placesCount']

zones_list = list(zone_groups.values())
zones_list.sort(key=lambda x: x['placeCount'], reverse=True)

# Build Categories
cat_groups = {}
for d in destinations:
    cat = d['category']
    if cat not in cat_groups:
        cat_groups[cat] = {
            "name": cat,
            "count": 0,
            "heroImage": d['imageUrl'],
            "fallbackHeroImage": d['fallbackImageUrl'],
            "places": []
        }
    cat_groups[cat]['count'] += 1
    cat_groups[cat]['places'].append(d['id'])

categories_list = list(cat_groups.values())
categories_list.sort(key=lambda x: x['count'], reverse=True)

output_dir = "src/data"
os.makedirs(output_dir, exist_ok=True)

with open(os.path.join(output_dir, "destinations.json"), "w", encoding="utf-8") as f:
    json.dump(destinations, f, indent=2, ensure_ascii=False)

with open(os.path.join(output_dir, "cities.json"), "w", encoding="utf-8") as f:
    json.dump(cities_list, f, indent=2, ensure_ascii=False)

with open(os.path.join(output_dir, "states.json"), "w", encoding="utf-8") as f:
    json.dump(states_list, f, indent=2, ensure_ascii=False)

with open(os.path.join(output_dir, "zones.json"), "w", encoding="utf-8") as f:
    json.dump(zones_list, f, indent=2, ensure_ascii=False)

with open(os.path.join(output_dir, "categories.json"), "w", encoding="utf-8") as f:
    json.dump(categories_list, f, indent=2, ensure_ascii=False)

print("Updated and rebuilt all JSON datasets successfully!")
