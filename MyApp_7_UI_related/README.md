
1) to create this application: npx @react-native-community/cli init MyApp_7_UI_related
2) to run the application: npx react-native run-android
3) ![alt text](image.png)
4) ![alt text](image-1.png)
5) ![alt text](image-2.png)

## -------- React Native tutorial in Hindi #28 TouchableHighlight | Style with Button --
1) ![alt text](image-3.png)
2) ![alt text](image-4.png)

Here is **the complete and clear explanation** about:

✅ Does **React Native default Button** support style?
❌ Why not?
✅ What is the **alternative**?
✅ What is **TouchableHighlight**, **TouchableOpacity**, **Pressable**, and when to use which?
📘 Full notes in simple language.

---

# ✅ **1. Does React Native Default Button Support Styling?**

**NO**, the default React Native `<Button />` **does NOT support full styling.**

### ❌ You CANNOT style:

* width
* height
* padding
* font size
* border
* border-radius (corner round)
* background color (on Android)

### ✔ You CAN style only:

* color
* onPress
* title

### Example:

```js
<Button title="Click me" color="red" />
```

---

# ❓ **2. Why Button cannot be styled in React Native?**

Because React Native tries to use **native OS components**.

### iOS:

Uses `UIButton` (native Apple button)

### Android:

Uses `android.widget.Button` (native Android button)

➡ These two systems have **different design rules**, shapes, padding, behavior.

SO React Native uses simple, basic props to keep the button **consistent and same** on both platforms.

That’s why styling is limited.

---

# ✅ **3. What is the Alternative for Styling?**

Use:

### ✔ **TouchableOpacity**

### ✔ **TouchableHighlight**

### ✔ **Pressable**

### ✔ **TouchableWithoutFeedback**

### ✔ **Custom Button using View + Text**

---

# ⭐ Recommended Alternative:

## 👉 **TouchableOpacity** (Most used)

Allows **full styling** using normal `View` + `Text`.

Example:

```js
<TouchableOpacity style={{ 
  backgroundColor: "blue",
  padding: 15,
  borderRadius: 10,
  width: 200
}}>
  <Text style={{ color: "white", textAlign: "center" }}>Click Me</Text>
</TouchableOpacity>
```

---

# ⭐ What is TouchableOpacity?

### ➤ A pressable component that reduces **opacity** (becomes lighter) when clicked.

✔ Smooth animation
✔ Used for custom buttons
✔ Most popular choice

---

# ⭐ What is TouchableHighlight?

### ➤ Same as TouchableOpacity BUT:

When pressed → it shows a **background highlight color**.

Example:

```js
<TouchableHighlight
  underlayColor="yellow"
  style={{
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    width: 200
  }}
>
  <Text style={{ color: "white", textAlign: "center" }}>Press Me</Text>
</TouchableHighlight>
```

### 🔍 Difference:

* **TouchableOpacity** → fades (opacity ↓)
* **TouchableHighlight** → shows highlight background color

---

# ⭐ **TouchableOpacity vs TouchableHighlight vs Pressable**

| Component                    | Feedback on Press      | Styling   | Use Cases                          |
| ---------------------------- | ---------------------- | --------- | ---------------------------------- |
| **Button**                   | Native system behavior | ❌ Limited | Simple buttons                     |
| **TouchableOpacity**         | Opacity fade           | ✔ Full    | Most custom buttons                |
| **TouchableHighlight**       | Highlight color        | ✔ Full    | When you want highlight effect     |
| **Pressable**                | Fully customizable     | ✔ Full    | Best for advanced interactions     |
| **TouchableWithoutFeedback** | No feedback            | ✔ Full    | When no visual press effect needed |

---

# ⭐ What is Pressable (Newer & Best)

React Native introduced `Pressable` as the **replacement for all touchables**.

Features:
✔ Detect press
✔ Detect long press
✔ Detect press in
✔ Detect press out
✔ Full styling
✔ Full animation support

Example:

```js
<Pressable 
  onPress={() => console.log("Pressed")}
  style={({ pressed }) => [
    {
      backgroundColor: pressed ? "#ddd" : "blue"
    },
    {
      padding: 15,
      borderRadius: 10
    }
  ]}
>
  <Text style={{ color: "white" }}>Pressable Button</Text>
</Pressable>
```

---

# 📘 FULL NOTES (READY TO SAVE)

Here is the full notes in a clean list:

---

# 📘 **React Native Button & Touchable Notes (Full Guide)**

### ✔ Default `<Button />`

* Limited styling
* Cannot change size, padding, borders
* Cross-platform native design
* Recommended only for very simple UI

---

# ✔ **Touchable Types**

### **1. TouchableOpacity**

* Most used for custom buttons
* Reduces opacity when pressed
* Smooth UI animation
* Supports full styling

---

### **2. TouchableHighlight**

* Shows highlight color on press
* Best for dark buttons
* Has `underlayColor` prop
* Full styling supported

---

### **3. Pressable (Best Modern Choice)**

* Highly customizable
* Detects: pressIn, pressOut, longPress
* Dynamic styling based on pressed state
* Recommended for production apps

---

### **4. TouchableWithoutFeedback**

* Invisible touch
* No animation
* Rarely used

---

# ⭐ Recommended Approach Today:

➡ **Use Pressable or TouchableOpacity**
➡ Build your button using **View + Text**

---

If you want, I can also provide:

📘 **Custom Button Component with reusability**
💡 **Animated button example**
✨ **Complete cheat sheet PDF**

Just tell me — **do you want custom reusable button code?**
1) ![alt text](image-5.png)


# ---------- React Native tutorial in Hindi #29 Make radio button in react-native -------
Below is a **complete guide to Radio Buttons in React Native** with:

✔ Full notes
✔ Best practices
✔ Multiple examples
✔ Custom Radio Button implementation
✔ How to make Radio Groups
✔ With styling

---

# ✅ **What Is a Radio Button?**

A **radio button** allows the user to select **only one option** from a set of options.

For example:

* Gender (Male, Female)
* Payment Mode (UPI, Card, Cash)
* Choose a plan (Basic, Premium)

**React Native does NOT have a built-in RadioButton component**, so we create our own or use a package.

---

# 📌 **Two Ways to Implement Radio Buttons**

### **1️⃣ Create Custom Radio Buttons (Preferred, No Library Required)**

### **2️⃣ Use a Library (react-native-paper)**

I’ll explain both.

---

# ⭐ **1️⃣ CUSTOM RADIO BUTTON – No Library Needed**

## ✔ Best + Most Flexible Method

## ✔ Works in all versions of React Native

## ✔ Fully customizable

---

# ✅ **Example 1: Simple Custom Radio Button Group**

```js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RadioExample() {
  const [selected, setSelected] = useState(null);

  const options = ["Male", "Female", "Other"];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Gender</Text>

      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.radioContainer}
          onPress={() => setSelected(item)}
        >
          <View style={styles.radioCircle}>
            {selected === item && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioText}>{item}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.result}>Selected: {selected}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 25, marginBottom: 20 },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioCircle: {
    height: 25,
    width: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#444",
  },
  radioText: { marginLeft: 10, fontSize: 18 },
  result: { marginTop: 20, fontSize: 20, fontWeight: "600" },
});
```

---

# 📝 **Notes – How Custom Radio Button Works**

### ✔ Outer Circle

`radioCircle` is the border circle.

### ✔ Inner Filled Circle

`radioInner` appears only if a value is selected:

```js
{selected === item && <View style={styles.radioInner} />}
```

### ✔ Select Only One

We store the selected option in state:

```js
const [selected, setSelected] = useState(null);
```

---

# ⭐ **2️⃣ RADIO BUTTON WITH A LIBRARY**

### Using **react-native-paper**

### 📦 Install:

```
npm install react-native-paper
npm install react-native-vector-icons
```

---

# ✅ Example: RadioButton.Group (react-native-paper)

```js
import * as React from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

export default function PaperRadioButton() {
  const [value, setValue] = React.useState("male");

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 15 }}>Select Gender</Text>

      <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton value="male" />
          <Text>Male</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton value="female" />
          <Text>Female</Text>
        </View>
      </RadioButton.Group>

      <Text style={{ marginTop: 20, fontSize: 18 }}>Selected: {value}</Text>
    </View>
  );
}
```

---

# 📌 **Custom Radio Button vs Library Radio Button**

| Feature               | Custom Radio | react-native-paper |
| --------------------- | ------------ | ------------------ |
| Styles                | 100% custom  | Limited            |
| Easy to use           | Medium       | Very easy          |
| Flexibility           | High         | Medium             |
| Additional dependency | ❌ No         | ✔ Yes              |
| Performance           | Fast         | Slightly heavy     |

---

# ⭐ **ADVANCED: Radio Buttons with Images + Cards**

(If you want, I can create this too)

---

# 🎯 **Summary Notes**

### ✔ React Native has no built-in radio button

### ✔ Custom Radio Button = best for full control

### ✔ Libraries make development faster

### ✔ Radio groups allow selecting only **one value**

### ✔ State stores selected value

### ✔ TouchableOpacity + circle views are used to build from scratch

---

# 📄 Want a beautifully formatted **PDF version** of Radio Button Notes + Examples?

Just say **"yes, give PDF"**.

Q: DVANCED: Radio Buttons with Images + Cards and also is there any dynamic radio button
ans:
Absolutely!
Here is a **complete, advanced guide** covering:

### ✅ Radio Buttons with **Images + Cards**

### ✅ Fully dynamic Radio Buttons (data coming from array / API)

### ✅ Clean reusable Radio Button component

### ✅ Full code + styling

---

# 🌟 **1. ADVANCED RADIO BUTTONS WITH IMAGES + CARDS**

Below is an example where each radio option appears like a **card**, with:

✔ Image
✔ Title
✔ Selected highlight
✔ Custom circle

---

# ✅ **Example: Radio Buttons with Image + Card Style**

```js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const plans = [
  {
    id: "1",
    title: "Basic Plan",
    price: "₹199 / month",
    image: "https://via.placeholder.com/80",
  },
  {
    id: "2",
    title: "Premium Plan",
    price: "₹399 / month",
    image: "https://via.placeholder.com/80",
  },
  {
    id: "3",
    title: "Pro Plan",
    price: "₹599 / month",
    image: "https://via.placeholder.com/80",
  },
];

export default function RadioCardExample() {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Plan</Text>

      {plans.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.card,
            selected === item.id && styles.selectedCard,
          ]}
          onPress={() => setSelected(item.id)}
        >
          <View style={styles.radioCircle}>
            {selected === item.id && <View style={styles.radioInner} />}
          </View>

          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.result}>Selected Plan: {selected}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: "#f1f1f1",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#007bff",
    backgroundColor: "#e8f0ff",
  },
  radioCircle: {
    height: 25,
    width: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#333",
  },
  image: { width: 60, height: 60, borderRadius: 8 },
  info: { marginLeft: 15 },
  title: { fontSize: 18, fontWeight: "600" },
  price: { fontSize: 16, color: "gray" },
  result: { marginTop: 20, fontSize: 20, fontWeight: "bold" },
});
```

---

# 🌟 **2. DYNAMIC RADIO BUTTONS**

Yes — React Native can easily create **dynamic radio buttons** using:

✔ API data
✔ Array of objects
✔ JSON response

The radio options will be generated automatically.

---

# ✅ **Dynamic Radio Buttons Example (No Cards)**

```js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function DynamicRadioExample() {
  const [selected, setSelected] = useState(null);

  const options = [
    { id: 1, label: "React Native" },
    { id: 2, label: "Flutter" },
    { id: 3, label: "Swift" },
    { id: 4, label: "Kotlin" },
  ];

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.heading}>Choose Technology</Text>

      {options.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.row}
          onPress={() => setSelected(item.id)}
        >
          <View style={styles.circle}>
            {selected === item.id && <View style={styles.checked} />}
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.result}>Selected: {selected}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 22, marginBottom: 15, fontWeight: "bold" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    width: 11,
    height: 11,
    backgroundColor: "#444",
    borderRadius: 6,
  },
  label: { marginLeft: 10, fontSize: 18 },
  result: { marginTop: 20, fontSize: 18, fontWeight: "600" },
});
```

---

# 🌟 **3. Reusable Custom Radio Button Component**

You can create one reusable component and use it everywhere.

---

# 🔁 **Reusable Radio Component**

### **RadioButton.js**

```js
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function RadioButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 10,
    height: 10,
    backgroundColor: "#444",
    borderRadius: 5,
  },
  label: { marginLeft: 10, fontSize: 18 },
});
```

---

### **Use It Anywhere**

```js
import React, { useState } from "react";
import { View, Text } from "react-native";
import RadioButton from "./RadioButton";

export default function ReusableRadioExample() {
  const [selected, setSelected] = useState(null);

  const items = ["Dog", "Cat", "Rabbit"];

  return (
    <View style={{ padding: 20 }}>
      {items.map((item) => (
        <RadioButton
          key={item}
          label={item}
          selected={selected === item}
          onPress={() => setSelected(item)}
        />
      ))}

      <Text>Selected: {selected}</Text>
    </View>
  );
}
```

---

# 🎉 **FINAL SUMMARY**

### ✔ Yes, React Native supports **dynamic radio buttons**

### ✔ You can generate data from API / JSON

### ✔ You can create **radio buttons with images + card UI**

### ✔ You can create one **reusable Radio component**

### ✔ Fully customizable using `TouchableOpacity` & `View`

---

# 📌 Want a **full PDF of Radio Buttons Notes + All Examples**?

Just say **"yes give PDF"**.
