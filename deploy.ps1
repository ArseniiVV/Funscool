# ==============================
# Deploy Nuxt static site to Yandex Cloud Object Storage
# ==============================

# Configuration
$BucketName = "kazan.funscool.ru"       # your Yandex Cloud bucket name
$BuildDir   = ".output/public"      # static output folder from Nuxt generate
$CacheControlImmutable = "public, max-age=31536000, immutable"
$CacheControlImages    = "public, max-age=31536000"
$CacheControlHtml      = "no-cache, max-age=0, must-revalidate"
$CacheControlSeo       = "public, max-age=86400"
$CacheControlJson      = "public, max-age=86400"

Write-Host "=== 1. Building Nuxt project ==="
npm install
npx nuxi generate

if (-Not (Test-Path $BuildDir)) {
    Write-Error "Build directory not found. Please check your Nuxt build."
    exit 1
}

Write-Host "=== 2. Clearing bucket ==="
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 rm "s3://$BucketName" --recursive

Write-Host "=== 3. Uploading all files ==="
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive

Write-Host "=== 4. Re-uploading files with correct MIME types ==="

# HTML
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.html" --content-type "text/html" --cache-control $CacheControlHtml --metadata-directive REPLACE

# SEO files (robots/sitemap)
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "robots.txt" --content-type "text/plain" --cache-control $CacheControlSeo --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "sitemap.xml" --content-type "application/xml" --cache-control $CacheControlSeo --metadata-directive REPLACE

# JavaScript
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.js" --content-type "application/javascript" --cache-control $CacheControlImmutable --metadata-directive REPLACE

# CSS
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.css" --content-type "text/css" --cache-control $CacheControlImmutable --metadata-directive REPLACE

# JSON
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.json" --content-type "application/json" --cache-control $CacheControlJson --metadata-directive REPLACE

# Fonts
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.woff2" --content-type "font/woff2" --cache-control $CacheControlImmutable --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.woff"  --content-type "font/woff"  --cache-control $CacheControlImmutable --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.ttf"   --content-type "font/ttf"   --cache-control $CacheControlImmutable --metadata-directive REPLACE

# Images
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.svg"  --content-type "image/svg+xml" --cache-control $CacheControlImages --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.png"  --content-type "image/png"     --cache-control $CacheControlImages --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.jpg"  --content-type "image/jpeg"    --cache-control $CacheControlImages --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.jpeg" --content-type "image/jpeg"    --cache-control $CacheControlImages --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.webp" --content-type "image/webp"    --cache-control $CacheControlImages --metadata-directive REPLACE
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.ico"  --content-type "image/x-icon"  --cache-control $CacheControlImages --metadata-directive REPLACE

# Video
aws --profile yandex --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive `
    --exclude "*" --include "*.mp4" --content-type "video/mp4" --cache-control $CacheControlImages --metadata-directive REPLACE

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
