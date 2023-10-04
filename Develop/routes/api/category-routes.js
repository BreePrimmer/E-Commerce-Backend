const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    })
    // const category = categoryData.get({ plain: true });
    return res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json('Server-side error.')
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    })
    // const category = categoryData.get({ plain: true });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory)
    if (!newCategory) {
      res.status(400).json('Oops! Looks like there is no new category to post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body,
      {
        where: 
          {id: req.params.id}
      }
    )
    res.status(200).json(updateCategory)
    if (!updateCategory) {
      res.status(400).json('Oops! Looks like there are no updates to add!')
    }  
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.findByPk(req.params.id)
    console.log(deleteCategory)
    deleteCategory.destroy()
    res.status(200).json('Successfully deleted.')
    if (!deleteCategory) {
      res.status(400).json('Oops! Looks like there are no categories to delete.')
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
