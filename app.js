require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Member } = require('./models');

const app = express();

const port = 3010;

app.use(express.json());
app.use(cors());
app.post('/members/login', async (req, res) => {
  try {
    const { memberId, password } = req.body;

    const userData = await Member.findOne({
      where: { memberId, password },
    })

    if (userData) {
      const accessToken = jwt.sign(memberId, 'hello');
      const refreshToken = jwt.sign({}, 'hello');
      return res.status(200).json({ accessToken, refreshToken })
    }
    return res.status(401).json({ message: '로그인 실패' })
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

app.listen(port, () => { })