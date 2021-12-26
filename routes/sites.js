const express=require('express')
const router =express.Router()
const Site = require('../models/site')

// Getting all
router.get('/', async  (req, res) => {
  try {
    const sites = await Site.find()
    res.json(sites)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id',getSite ,(req, res) => {
   res.json(res.site)
})

// Creating one
router.post('/', async (req, res) => {
  const site = new Site({
    name: req.body.name,
    siteDescription: req.body.siteDescription
  })
  try {
    const newSite = await site.save()
    res.status(201).json(newSite)
  } catch (err) {
    res.status(400).json({ message: err.message })
 }
})

// Updating One
router.patch('/:id',getSite,async (req, res) => {
  if (req.body.name != null) {
    res.site.name = req.body.name
  }
  if (req.body.siteDescription != null) {
    res.site.siteDescription = req.body.siteDescription
  }
  try {
    const updatedSite = await res.site.save()
    res.json(updatedSite)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id',getSite, async (req, res) => {
  try {
    await res.site.remove()
    res.json({ message: 'Deleted Site' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
 })

async function getSite(req, res, next) {
  let site
  try {
    site = await Site.findById(req.params.id)
    if (site == null) {
      return res.status(404).json({ message: 'Cannot find this site' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.site = site
  next()
}




module.exports = router