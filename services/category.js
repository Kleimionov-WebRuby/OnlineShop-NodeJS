const categoryRepository = require('../repositories/category');

class categoryService {
  async getCategories() {
    return await categoryRepository.getAll();
  }

  async createCategory(category) {
    return await categoryRepository.create(category);
  }

  async updateCategory(id, newCategory) {
    const category = await categoryRepository.get(id);

    if (!category) {
      throw new Error(
        "Sorry, this category is not found. You can't update this category, because it doesn't exists.",
      );
    }
    await categoryRepository.update(id, newCategory);
    return await 'Category successfully updated';
  }

  async deleteCategory(id) {
    const category = await categoryRepository.get(id);

    if (!category) {
      throw new Error(
        "Sorry, this category is not found. You can't delete this category, because it doesn't exists.",
      );
    }
    await categoryRepository.delete(id);
    return await 'Category successfully deleted';
  }
}

module.exports = new categoryService();
