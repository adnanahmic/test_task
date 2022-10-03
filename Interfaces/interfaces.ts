export interface IsArticle {
  article: {};
  title: string;
  excerpt: string;
  date: string;
  post_image: string;
  post_category_id: string;
  slug: string,
  index: number;
}

export interface IsNavBar {
  name: string
}

export interface Categories {
  category: []
}

export interface Data {
  data: []
}
