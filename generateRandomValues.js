const fs = require("fs");
const path = require("path");

// 配列の長さと乱数の範囲を定義
const ARRAY_LENGTH = 100;
const MIN_VALUE = 0;
const MAX_VALUE = 1;

// ランダムな値を生成する関数
function generateRandomValues(length, min, max) {
  return Array.from({ length }, () => Math.random() * (max - min) + min);
}

// ランダムな配列を生成
const randomValues = generateRandomValues(ARRAY_LENGTH, MIN_VALUE, MAX_VALUE);

// TypeScriptファイルの内容を作成
const fileContent = `// This file is auto-generated. Do not edit directly.
export const randomValues = ${JSON.stringify(randomValues, null, 2)};`;

// ファイルパスを設定
const outputPath = "randomValues.ts";

// ファイルを書き込む
fs.writeFileSync(outputPath, fileContent);

console.log(`Random values file has been generated at: ${outputPath}`);
