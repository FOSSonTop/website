#!/bin/bash

repos=(
    "https://github.com/FOSSonTop/aosp docs/aosp"
    "https://github.com/FOSSonTop/crave docs/crave"
    "https://github.com/FOSSonTop/gamedev docs/gamedev"
)

# Loop through each repo and update it
for repo in "${repos[@]}"; do
    set -- $repo  # Split the URL and path
    url=$1
    path=$2

    if [ ! -d "$path/.git" ]; then
        echo "Cloning $url into $path..."
        git clone "$url" "$path" --depth 1
    else
        echo "Updating $path..."
        (cd "$path" && git pull)
    fi
done
