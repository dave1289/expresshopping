const { catchClause } = require("@babel/types")
const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const list = require("../fakeDb")

router.get('/', (req, res) => {
   res.json({list})
})

router.post('/', (req, res) => {
   const newItem = {
      name: req.body.name,
      price: req.body.price
   }
   list.push(newItem)
   res.status(201).json({ item: newItem})
})

router.get('/:item', (req, res) => {
   const foundItem = list.find(item => item.name === req.params.item)
   if(foundItem === undefined) {
      throw new ExpressError('Item not found', 404)
   }
   res.json({ item: foundItem})
})

router.patch('/:item', (req, res) => {
   const editItem = list.find(item => item.name === req.params.name)
   if(editItem === undefined) {
      throw new ExpressError('Item not found', 404)
   }
   editItem.name = req.body.name
   editItem.price = req.body.price
   res.json({ item: editItem})
})

router.delete('/:item', (req, res) => {
   const deleteItem = list.find(item => item.name === req.params.name)
   if(deleteItem === undefined) {
      throw new ExpressError('Item not found', 404)
   }
   list.splice(deleteItem, 1)
   res.json({ message: 'Deleted'})
})

module.exports = router;