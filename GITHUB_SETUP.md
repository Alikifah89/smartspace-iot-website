# GitHub Repository Setup Guide

## Step 1: Create GitHub Repository

1. **Visit GitHub**: Go to [https://github.com/new](https://github.com/new)

2. **Repository Details**:
   - **Repository name**: `smartspace-iot-website`
   - **Description**: موقع إلكتروني متكامل لبيع الأجهزة الإلكترونية الذكية وإنترنت الأشياء مع محاكي 3D
   - **Visibility**: ✅ Public (recommended for portfolio)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

3. **Click**: "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository on GitHub, you'll see instructions. Run these commands:

```bash
cd "c:\Users\ali89\Downloads\OKComputer_موقع IoT فخم"

git remote add origin https://github.com/YOUR_USERNAME/smartspace-iot-website.git

git push -u origin main
```

**Replace** `YOUR_USERNAME` with your actual GitHub username!

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all files uploaded:
   - ✅ index.html
   - ✅ style.css
   - ✅ main.js
   - ✅ All HTML pages (products.html, designer.html, etc.)
   - ✅ resources/ folder with images
   - ✅ README.md

## Step 4: Enable GitHub Pages (Optional)

To host your website for free on GitHub Pages:

1. Go to repository **Settings**
2. Click **Pages** in the left sidebar
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/smartspace-iot-website/`

## Troubleshooting

### If you get authentication errors:
- Use a Personal Access Token (PAT) instead of password
- Generate one at: https://github.com/settings/tokens
- Use it as your password when Git asks

### If push is rejected:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## What's Already Done ✅

- ✅ Git repository initialized
- ✅ All files staged for commit
- ✅ .gitignore configured
- ✅ README.md updated with GitHub badge
- ✅ Development files cleaned up
- ✅ CSS extracted to external file
- ✅ Layout enhanced with responsive design

## Next Steps

1. Create the GitHub repository (follow Step 1 above)
2. Connect and push (follow Step 2 above)
3. Update the GitHub badge in README.md with your actual username
4. (Optional) Enable GitHub Pages for free hosting

---

**Note**: The repository is ready to push! All local setup is complete.
