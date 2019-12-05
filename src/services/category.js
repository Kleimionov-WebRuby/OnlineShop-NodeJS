const CategoryRepository = require('../repositories/category');
const NotFoundError = require('../classes/errors/not-found-error');

const categoryRepository = new CategoryRepository();

class CategoryService {
  async getCategories() {
    return await categoryRepository.getAll();
  }

  async createCategory(category) {
    return await categoryRepository.create(category);
  }

  async updateCategory(id, newCategory) {
    const category = await categoryRepository.get(id);

    if (!category) {
      throw new NotFoundError(
        "Sorry, this category is not found. You can't update this category, because it doesn't exists.",
        404,
      );
    }

    await categoryRepository.update(id, newCategory);

    return null;
  }

  async deleteCategory(id) {
    const category = await categoryRepository.get(id);

    if (!category) {
      throw new NotFoundError(
        "Sorry, this category is not found. You can't delete this category, because it doesn't exists.",
        404,
      );
    }

    await categoryRepository.delete(id);

    return null;
  }
}

module.exports = CategoryService;
