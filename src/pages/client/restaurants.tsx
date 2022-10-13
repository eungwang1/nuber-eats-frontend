import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "./restaurants.generated";

const RESTAURANTS_QUERY = gql`
  query restaurantsPage($input: RestaurantsInput!) {
    restaurants(input: $input) {
      error
      ok
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        address
        isPromoted
        category {
          name
        }
      }
    }
    allCategories {
      error
      ok
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading, error } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  console.log();
  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="Search"
          className="input rounded-md border-0 w-3/12"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto ">
            {data?.allCategories.categories?.map((category) => {
              console.log(category);
              return (
                <div className="flex flex-col items-center cursor-pointer">
                  <div
                    className="w-14 h-14 bg-cover hover:bg-gray-100 rounded-full"
                    style={{ backgroundImage: `url(${category.coverImg})` }}
                  ></div>
                  <span className="mt-1 text-sm text-center font-medium">
                    {category.name}asdasd
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
