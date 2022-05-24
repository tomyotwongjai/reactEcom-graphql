// import { gql } from 'apollo-boost';
import gql from 'graphql-tag';

export const getCategories = gql `
    {
        categories {
            name
        }
    }
`

export const getProducts = gql`
{
    categories{
        name
        products{
          id
          name
          inStock
          gallery
          description
          category
          attributes{
            id
            name
            type
            items{
              displayValue
              value
              id
            }
          }
          prices{
            currency{
              label
              symbol
            }
            amount
          }
          brand
        }
      }
}
`;