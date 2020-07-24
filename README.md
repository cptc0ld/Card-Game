# Word-Game

## Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Usage](#usage)

## About <a name = "about"></a>

Mini Word memorization game made in nodejs

---

## Getting Started <a name = "getting_started"></a>

### Prerequisites

-   nodejs, npm
-   expressjs
-   nodemon

```
npm install expressjs

npm install -g nodemon
```

---

### Installing

1. Clone this repository
2. Install required packages
3. Make sure to include nodemon.json

---

## **Usage <a name = "usage"></a>**

### API's

_Vocab_

```
GET - localhost:3000/api/vocab
```

returns :
Full dictionary

Learing rates are of 3 types

1. Mastered: If you know the meaning of the word
2. Review: If you know the meaning of the word but have guessed it wrong atleast 1 time
3. Learn: If you don't know the meaning of the word

---

_VocabUpdate_

Updates the dictionary based on your answers

```
POST - localhost:3000/api/vocabUpdate
data {
  index
  type
}
```

---

_VocabCount_

```
GET - localhost:3000/api/vocabcount
```

returns :
{
newcount,
masteredcount,
learncount,
reviewcount
}

---

_VocabReset_

Resets the word progress

```
POST - localhost:3000/api/vocabreset
```

---

_IndividualVocab_

Returns Individual learning rate's data

```
GET - localhost:3000/api/indivocab
```

returns :
{
mastered,
review,
learn
}
