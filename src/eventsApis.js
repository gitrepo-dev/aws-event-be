
// import
const serverless = require('serverless-http');
const express = require('express')
const cors = require('cors');
const app = express()
const db = require("./dynamodb")


// initializing
app.use(cors());
app.use(express.json())
const EVENTS_TABLE = process.env.EVENTS_TABLE;


/**
 * get all expenses
 * @param {''}
 * @method GET
 * @return {data[Object]}
**/
app.get('/get/events', (req, res) => {
  try {
    // payload
    const params = {
      TableName: EVENTS_TABLE
    }
    // get all expenses
    db.scan(params, (error, result) => {
      if (error) {
        res.status(400).json({
          message: 'Something went wrong.',
          success: false,
        });
      }
      if (result?.Items?.length > 0) {
        res.status(200).json({
          message: 'Successfully fetched all Events.',
          success: true,
          data: result?.Items
        })
      } else {
        res.status(200).json({
          message: 'Events Not found.',
          success: true,
        })
      }
    })
  } catch (e) {
    res.status(500).json({
      message: `Server error 500`,
      success: false,
      error: e.message,
      stack: e.stack
    });
  }
})


/**
 * add expenses
 * @param {event Object}
 * @method POST
 * @return {Object}
**/
app.post('/create/event', (req, res) => {
  try {
    // payload
    const params = {
      TableName: EVENTS_TABLE,
      Item: req.body
    }
    // create new user
    db.put(params, (error) => {
      if (error) {
        res.status(400).json({
          message: 'Something went wrong.',
          success: false,
        });
      }
      if (Object.values(req.body).length === 6) {
        res.status(201).json({
          message: 'Successfully created events.',
          success: true
        })
      } else {
        res.status(400).json({
          message: 'All fields are required to create an events.',
          success: false,
        })
      }
    })
  } catch (e) {
    res.status(500).json({
      message: `Server error 500`,
      success: false,
      error: e.message,
      stack: e.stack
    });
  }
})


/**
 * delete indivisual event
 * @param {uuid}
 * @method DELETE
 * @return {data[Object]}
**/
app.delete('/delete/event/:uuid', (req, res) => {
  try {
    // payload
    const params = {
      TableName: EVENTS_TABLE,
      Key: { uuid: req.params.uuid }
    }
    // create new user
    db.delete(params, (error) => {
      if (error) {
        res.status(400).json({
          message: "Couldn't delete something went wrong.",
          success: false,
        });
      } else {
        res.status(200).json({
          message: 'Successfully deleted event.',
          success: true,
        })
      }
    })
  } catch (e) {
    res.status(500).json({
      message: `Server error 500`,
      success: false,
      error: e.message,
      stack: e.stack
    });
  }
})

module.exports.handler = serverless(app);