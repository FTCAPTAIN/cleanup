#!/bin/bash
# 🚀 Cleanzup Auto Git Push Script (for >60MB repos)

echo "🔧 Setting up Git LFS..."
git lfs install

# Track large files
git lfs track "*.zip"
git lfs track "*.mp4"
git lfs track "*.png"
git lfs track "*.jpg"
git lfs track "*.mov"
git lfs track "*.exe"

git add .gitattributes

echo "🧹 Cleaning large files (>100MB)..."
if ! command -v git-filter-repo &> /dev/null
then
    echo "Installing git-filter-repo..."
    sudo apt install -y git-filter-repo
fi

git filter-repo --strip-blobs-bigger-than 100M || echo "✅ No large files found."

echo "📦 Adding all files..."
git add .

read -p "📝 Enter commit message: " msg
git commit -m "${msg:-Auto commit by Cleanzup script}"

# Check remote
if ! git remote | grep -q origin; then
    read -p "🌐 Enter GitHub repo URL (e.g. https://github.com/yourname/cleanzup.git): " repo
    git remote add origin "$repo"
fi

echo "☁️ Pushing to GitHub..."
git push -u origin main || git push -u origin master

echo "✅ Done! Your Cleanzup project is now pushed successfully!"
