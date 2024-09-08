export interface Guitar {
    id : number;
    name : string;
    image : string;
    description : string;
    price : number;
}

export interface CartItem extends Guitar {
    quantity: number;
}

// utility types (solo con types)
// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price'> & {
//     quantity : number;
// }

export interface GuitarProps {
    guitar : Guitar;
    addToCart: (item: Guitar) => void;
}