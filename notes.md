const subtasks = data
  .split(/\d+\.\s+/) // numbers ke hisaab se split
  .filter(Boolean)   // empty strings hatao
  .map(title => ({
    title: title.trim(),
    done: false
  }));

  # split(/\d+\.\s+/) ek regex based split hai.
Isme teen parts hain:

1️⃣ \d+
\d → ek digit (0–9)
+ → ek ya zyada digit

Matlab \d+ match karega:
1
12
999

2️⃣ \.
Normally regex me . ka matlab "koi bhi character" hota hai.

Lekin yaha \. likha hai → iska matlab actual dot (.) character.

Iska kaam hai numbering ke baad wala dot pakadna:

1.
12.
5.

3️⃣ \s+
\s → ek whitespace (space, tab, newline)

+ → ek ya zyada spaces
Matlab:
"  "
"\t"
"   "
sab match karega.


🔗 Combine karke: /\d+\.\s+/
Matlab: “Ek ya zyada digits” + “dot” + “ek ya zyada spaces”

Example matches:
"1. "  
"23.   "  
"5.     "

🛠 Kaam kaise karta hai .split() ke saath:
.split() ka kaam hai string ko todna jahan regex match hota hai.

Example:

"1. Apple 2. Banana 3. Mango".split(/\d+\.\s+/)
Step-by-step:

Match 1. → split here

Match 2. → split here

Match 3. → split here

Result:
["", "Apple", "Banana", "Mango"]




# split() basic example
Code:

js
Copy
Edit
const text = "apple,banana,grapes";
const result = text.split(",");
console.log(result);
Kya hota hai:

.split(",") ka matlab → string ko comma , par tod do.

"apple,banana,grapes" todke ban jayega:

js
Copy
Edit
["apple", "banana", "grapes"]

2. .filter(Boolean)

Yeh array me se falsey values (empty strings, null, undefined, 0, etc.) hata deta hai.

Hamare case me pehla empty string remove ho jayega.

3. .map(title => ({ title: title.trim(), done: false }))

Har ek split result ko ek object banata hai.

title.trim() → start/end ke extra spaces hata deta hai.

done: false → default status rakhta hai ki subtask complete nahi hai.