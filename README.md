# 🎸 AIR Guitar × 🎹 Touch Pianist (React + Vite)

An experimental interactive music web app inspired by **AIR Guitar gestures** and the **Touch Pianist** concept.

一個結合 **AIR Guitar 手勢演奏** 與 **Touch Pianist 觸控式音樂概念** 的互動式音樂實驗專案。

---

## 🌟 Concept｜概念

This project turns the entire screen into a musical instrument.

這個專案將整個畫面變成一個可以「演奏」的樂器。

- 🎸 AIR Guitar → expressive motion-based performance  
  🎸 空氣吉他 → 透過動作進行音樂表現

- 🎹 Touch Pianist → continuous touch music flow  
  🎹 Touch Pianist → 連續觸控式音樂流

You don’t press buttons — you perform with movement.

你不需要按按鈕，而是用「移動」來演奏音樂。

---

## 🎯 Core Idea｜核心概念

The entire `div` is the instrument.

整個 `div` 就是一個樂器。

| Interaction｜互動 | Result｜效果 |
|------------------|-------------|
| Mouse move 滑鼠移動 | Plays notes 持續發聲 |
| Touch move 觸控滑動 | Mobile performance 手機演奏 |
| X-axis X 軸 | Pitch 音高 |
| Y-axis Y 軸 | Volume / tone 音量與音色 |

---

## ⚙️ Tech Stack｜技術架構

- React (Vite)
- Web Audio API
- JavaScript (ES6+)
- CSS (dark ambient theme)

---

## 🎮 How It Works｜運作方式

Pointer position is mapped to sound parameters in real time.

滑鼠或觸控位置會即時映射到聲音參數：

- X position → frequency (pitch)｜X 軸 → 音高
- Y position → gain (volume)｜Y 軸 → 音量
- Oscillator generates sound｜震盪器產生聲音
- Filter shapes tone｜濾波器改變音色

This creates a fluid “instrument-like” experience.

形成一種流動式的「樂器演奏體驗」。

---

## 🚀 Getting Started｜啟動專案

### 1. Install dependencies｜安裝依賴
```bash
npm install