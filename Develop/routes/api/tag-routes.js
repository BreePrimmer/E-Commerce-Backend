const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
    const tags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    })
    res.status(200).json(tags)
    if (!tags) {
      res.status(400).json('Oops! Looks like there are currently no tags!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    })
    res.status(200).json(tagId)
    if (!tagId) {
      res.status(400).json('Oops! Looks like there is no tag with this id!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
    if (!newTag) {
      res.status(400).json('Oops! Looks like there is no new tag to post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body,
      {
        where: 
          {id: req.params.id}
      }
    )
    res.status(200).json(updateTag)
    if (!updateTag) {
      res.status(400).json('Oops! Looks like there are no updates to add!')
    }  
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.findByPk(req.params.id)
    console.log(deleteTag)
    deleteTag.destroy()
    res.status(200).json('Successfully deleted.')
    if (!deleteTag) {
      res.status(400).json('Oops! Looks like there are no categories to delete.')
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
