import pandas as pd
import json

file_path = "Data set of famous India tourist places along with there images.xlsx"
excel_file = pd.ExcelFile(file_path)
print("Sheet names:", excel_file.sheet_names)

df = pd.read_excel(file_path, sheet_name=excel_file.sheet_names[0])
print("Shape:", df.shape)
print("\nColumns:", df.columns.tolist())
print("\nSample row 0:")
print(df.iloc[0].to_dict())
print("\nUnique cities count:", df['City'].nunique() if 'City' in df.columns else 'No City col')
if 'City' in df.columns:
    print("Cities sample:", df['City'].unique()[:20])
if 'State' in df.columns:
    print("States count:", df['State'].nunique())
    print("States sample:", df['State'].unique()[:20])

print("\nNull counts:")
print(df.isnull().sum())
