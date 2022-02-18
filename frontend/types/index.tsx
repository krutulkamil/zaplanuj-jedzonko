export interface AllRecipesCategoriesTags {
    recipes:    Recipe[];
    categories: Category[];
    tags:       Tag[];
    size:       number;
}

export interface Recipe {
    _id:        string;
    categories: Category[];
    tags:       Tag[];
    title:      string;
    excerpt:    string;
    slug:       string;
    postedBy:   PostedBy;
    photo:      Photo;
    createdAt:  Date;
    updatedAt:  Date;
}

export interface Tag {
    _id:  string;
    name: string;
    slug: string;
    __v:  number;
}

export interface Category {
    _id:  string;
    name: string;
    slug: string;
    __v?:  number;
}

export interface Photo {
    _id:        string;
    filename:   string;
    secure_url: string;
}

export interface PostedBy {
    _id:  string;
    name: string;
}

export interface AuthUser {
    name?: string;
    email: string;
    password: string;
}

export interface User {
    token: string;
    user: UserInformation;
}

export interface UserInformation {
    _id:   string;
    name:  string;
    email: string;
    role:  number;
    __v:   number;
}