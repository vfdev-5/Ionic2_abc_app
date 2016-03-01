import {Page} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {CategoriesData} from '../../providers/categories-data';

@Page({
  templateUrl: 'build/pages/categories/categories.html'
})
export class CategoriesPage {
  static get parameters() {
    return [[CategoriesData]];
  }

  constructor(categoriesProvider) {
    this.categoriesProvider = categoriesProvider;
    this.categories = [];
    this.queryText = '';
  }

  onPageLoaded() {
    this.updateCategories();
  }

  updateCategories() {
    console.log("Update categories ...");
    this.categoriesProvider.get().then(categories => {
      console.log("Found " + categories.length + " categories");
      this.categories = categories;
      categories.forEach(cat => {
        cat.expanded=false;
      });
    })
  }

  reload() {
    console.log("Reload previous categories ...");
  }

  checkAll(isChecked) {
    this.categories.forEach(cat => {
      cat.isChecked=isChecked;
      cat.subcategories.forEach(subcat => {
        subcat.isChecked=isChecked;
      });
    });
  }

  onCategoryCheckStateChanged(category, value) {
    console.log("onCategoryCheckStateChanged : category.name=" + category.name + " | value=" + value);
    category.subcategories.forEach(subcat => {
      subcat.isChecked=value;
    });
  }

  onSubCategoryCheckStateChanged(category, subcategory, value) {
    console.log("onCategoryCheckStateChanged : subcategory.name=" + subcategory.name + " | value=" + value);
    if (!category.isChecked) category.isChecked=true;
  }

}
