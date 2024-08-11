import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { FILES_URL } from "../../../config/APIs";
import { ICategory, IProduct } from "../types/types";


type Props = {
  menuItem: ICategory;
  addToCart: (item: IProduct) => void;
};

const MenuItemWrapper = ({ menuItem, addToCart }: Props) => {
  return (
    <Card  >
      <CardHeader>
        <CardTitle className="capitalize text-xl flex justify-between">
          <p>{menuItem.name}</p>
          <img width={100} height={100} className="rounded-md" alt="image" src={`${FILES_URL}/${menuItem.cardImage.path}${menuItem.cardImage.name}`}/>
        </CardTitle>
      </CardHeader>
      <div className="mb-4 flex flex-col gap-4">
        {menuItem.products.map((item: IProduct) => (
          <CardContent className="cursor-pointer flex flex-row items-center justify-between pb-0" onClick={() => addToCart(item)}>
            <p className="capitalize">{item.name}</p>
            <p>{item.price}$</p>
          </CardContent>
        ))}
      </div>
    </Card>
  )
};

export default MenuItemWrapper;