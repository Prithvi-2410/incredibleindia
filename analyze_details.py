import pandas as pd
import json

file_path = "Data set of famous India tourist places along with there images.xlsx"
df = pd.read_excel(file_path)

print("Zones:", df['Zone'].value_counts().to_dict())
print("\nTypes:", df['Type'].value_counts().to_dict())
print("\nSignificances:", df['Significance'].value_counts().to_dict())
print("\nStates count and list:", len(df['State'].unique()), df['State'].unique().tolist())
print("\nCities count:", len(df['City'].unique()))

# Check some image URLs
print("\nSample 5 Image URLs:")
for url in df['Image URL'].head(10):
    print(" -", url)

# Check missing or empty image urls
empty_images = df[df['Image URL'].isna() | (df['Image URL'] == '')]
print("\nEmpty images count:", len(empty_images))
