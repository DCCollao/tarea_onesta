export interface Farmer {
  id: number;
  name: string;
  email: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface Field {
  id: number;
  name: string;
  location: string;
  farmer_id: number;
}

export interface Fruit {
  id: number;
  name: string;
}

export interface Variety {
  id: number;
  fruit_id: number;
  variety: string;
}