# ananas api project

## products

1. get all products [done]

-   [GET] /api/products

2. find product's name

-   [GET] /api/products?key=name

3. get a single product [done]

-   [GET] /api/products/p001

4. product filter with params as attribute, line, design, line, gender [done]

-   [GET] /api/products?param1=...&param2=...

5. sort products with desc or asc of poduct's cost [done]

-   [GET] /api/products?sort=desc

6. limit products [done]

-   [GET] /api/products?limit=5

7. add new product [50%]

-   [POST] /api/products

8. update a product [10%]

-   [PUT] /api/products/p001

9. delete a product [30%]

-   [DELETE] /api/products/:id

## cart

1. get all cart

-

2. get a single cart

-

3. find a cart

-

4. get carts in a date range

-

5. limit carts

-

6. sort carts

-

7. get carts in date range

-

8. get user carts

-   [GET] /api/carts/user/u001

9. add a new product

-   [POST] /api/carts/product/p001

10. update a product

-   [PUT] /api/carts/products/p001?quantity=1

11. delete a product

-   [DELETE] /api/carts/product/p001

12. delete a cart

-   [DELETE] /api/carts/c001

## check out

1. check out product selected in cart

-   [GET] /api/check-out/cart/c001

## user

1. get all users

-   [GET] /api/users

2. get a single user

-   [GET] /api/users/u001

3. find a user

-   [GET] /api/users?key=u001

4. limit users

-   [GET] /api/users?limit=5

5. sort users

-   [GET] /api/users?sort=desc

6. add a new user

-   [POST] /api/users/

7. update a user

-   [PUT] /api/users/u001

8. delete a user

-   [DELETE] /api/users/u001

## login

1. user login

-   [POST] /api/auth/login

## register

2. user register

-   [POST] /api/auth/register
