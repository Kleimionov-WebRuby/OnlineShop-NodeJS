const CategoryRepository = require('../repositories/category');

class CategoryService {
  async getCategories() {
    return await CategoryRepository.getAll();
  }

  async createCategory(category) {
    return await CategoryRepository.create(category);
  }

  async updateCategory(id, newCategory) {
    const category = await CategoryRepository.get(id);

    if (!category) {
      throw new Error(
        "Sorry, this category is not found. You can't update this category, because it doesn't exists.",
      );
    }
    await CategoryRepository.update(id, newCategory);
    return await 'Category successfully updated';
  }

  async deleteCategory(id) {
    const category = await CategoryRepository.get(id);

    if (!category) {
      throw new Error(
        "Sorry, this category is not found. You can't delete this category, because it doesn't exists.",
      );
    }
    await CategoryRepository.delete(id);
    return await 'Category successfully deleted';
  }
}

module.exports = new CategoryService();
