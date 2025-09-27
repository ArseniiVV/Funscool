# ==============================
# Deploy Nuxt static site to Yandex Cloud Object Storage
# ==============================

# Конфигурация
$BucketName = "landings-2025"      # имя бакета в Object Storage
$BuildDir   = ".output/public"     # папка со статикой после nuxi generate

Write-Host "=== 1. Сборка Nuxt проекта ==="
npm install
npx nuxi generate

if (-Not (Test-Path $BuildDir)) {
    Write-Error "Каталог $BuildDir не найден. Проверяй сборку."
    exit 1
}

Write-Host "=== 2. Очистка бакета ==="
# $ConfirmClear = Read-Host "Очистить бакет $BucketName перед загрузкой? (y/n)"
# if ($ConfirmClear -eq "y") {
    aws --endpoint-url=https://storage.yandexcloud.net s3 rm "s3://$BucketName" --recursive
# }

Write-Host "=== 3. Загрузка всех файлов (как есть) ==="
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive

Write-Host "=== 4. Перезапись с правильным MIME ==="

# HTML
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.html" --content-type "text/html" --metadata-directive REPLACE
# JS
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.js" --content-type "application/javascript" --metadata-directive REPLACE
# CSS
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.css" --content-type "text/css" --metadata-directive REPLACE
# JSON
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.json" --content-type "application/json" --metadata-directive REPLACE

# Шрифты
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.woff2" --content-type "font/woff2" --metadata-directive REPLACE
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.woff"  --content-type "font/woff"  --metadata-directive REPLACE
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.ttf"   --content-type "font/ttf"   --metadata-directive REPLACE

# Картинки
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.svg"  --content-type "image/svg+xml" --metadata-directive REPLACE
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.png"  --content-type "image/png"     --metadata-directive REPLACE
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.jpg"  --content-type "image/jpeg"    --metadata-directive REPLACE
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.jpeg" --content-type "image/jpeg"    --metadata-directive REPLACE
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.webp" --content-type "image/webp"    --metadata-directive REPLACE
aws --endpoint-url=https://storage.yandexcloud.net s3 cp "$BuildDir\" "s3://$BucketName" --recursive --exclude "*" --include "*.ico"  --content-type "image/x-icon"  --metadata-directive REPLACE

if ($LASTEXITCODE -eq 0) {
    Write-Host "=== ✅ Деплой завершён ==="
    Write-Host "Сайт доступен: http://$BucketName.website.yandexcloud.net"

    Write-Host "=== 5. Проверка MIME-типа для ключевых файлов ==="
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
            # возьмем первый попавшийся файл по шаблону
            $file = aws --endpoint-url=https://storage.yandexcloud.net s3 ls "s3://$BucketName/$pattern" | Select-String -Pattern "\s+(\S+)$" | ForEach-Object { $_.Matches[0].Groups[1].Value } | Select-Object -First 1
            if ($file) {
                $meta = aws --endpoint-url=https://storage.yandexcloud.net s3api head-object --bucket $BucketName --key $file
                $ct = ($meta | ConvertFrom-Json).ContentType
                Write-Host "$file  -->  $ct"
            }
        } catch {
            Write-Warning "Не удалось проверить $pattern"
        }
    }
} else {
    Write-Error "Ошибка при загрузке файлов"
}
