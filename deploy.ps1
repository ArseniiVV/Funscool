# ==============================
# Deploy Nuxt static site to Yandex Cloud Object Storage
# ==============================

# Configuration
$BucketName = "gdkids.ru"       # your Yandex Cloud bucket name
$BuildDir   = ".output/public"      # static output folder from Nuxt generate

Write-Host "=== 1. Building Nuxt project ==="
npm install
npx nuxi generate

if (-Not (Test-Path $BuildDir)) {
    Write-Error "Build directory not found. Please check your Nuxt build."
    exit 1
}

Write-Host "=== 2. Clearing bucket ==="
$ConfirmClear = Read-Host "Clear bucket $BucketName before upload? (y/n)"
if ($ConfirmClear -eq "y") {
    aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 rm "s3://$BucketName" --recursive
}

Write-Host "=== 3. Uploading all files ==="
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive

Write-Host "=== 4. Re-uploading files with correct MIME types ==="

# HTML
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.html" --content-type "text/html" --metadata-directive REPLACE

# JavaScript
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.js" --content-type "application/javascript" --metadata-directive REPLACE

# CSS
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.css" --content-type "text/css" --metadata-directive REPLACE

# JSON
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.json" --content-type "application/json" --metadata-directive REPLACE

# Fonts
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.woff2" --content-type "font/woff2" --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.woff"  --content-type "font/woff"  --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.ttf"   --content-type "font/ttf"   --metadata-directive REPLACE

# Images
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.svg"  --content-type "image/svg+xml" --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.png"  --content-type "image/png"     --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.jpg"  --content-type "image/jpeg"    --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.jpeg" --content-type "image/jpeg"    --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.webp" --content-type "image/webp"    --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.ico"  --content-type "image/x-icon"  --metadata-directive REPLACE

if ($LASTEXITCODE -eq 0) {
    Write-Host "=== ✅ Deploy completed successfully ==="
    Write-Host "Site URL: http://$BucketName.website.yandexcloud.net"

    Write-Host "=== 5. Checking MIME types for key files ==="
    $checkFiles = @(
        "_nuxt/*.js",
        "index.html",
        "favicon.ico",
        "fonts/*.woff2",
        "fonts/*.woff",
        "fonts/*.ttf"
    )
    foreach ($pattern in $checkFiles) {
        try {
            $file = aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 ls "s3://$BucketName/$pattern" |
                Select-String -Pattern "\s+(\S+)$" |
                ForEach-Object { $_.Matches[0].Groups[1].Value } |
                Select-Object -First 1

            if ($file) {
                $meta = aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3api head-object --bucket $BucketName --key $file
                $ct = ($meta | ConvertFrom-Json).ContentType
                Write-Host "$file  -->  $ct"
            }
        } catch {
            Write-Warning "Could not check $pattern"
        }
    }
} else {
    Write-Error "Error occurred while uploading files"
}
