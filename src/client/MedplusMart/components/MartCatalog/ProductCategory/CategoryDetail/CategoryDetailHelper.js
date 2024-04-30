import { useEffect, useRef } from "react";
import Validate from "../../../../../helpers/Validate";

export const getInitialSortAndFilter = (urlFilterParams) => {
    const validate = Validate();
    return {
        brands: (validate.isNotEmpty(urlFilterParams) && validate.isNotEmpty(urlFilterParams.brands) ? [...urlFilterParams.brands] : []),
        subLevelCategories: (validate.isNotEmpty(urlFilterParams) && validate.isNotEmpty(urlFilterParams.subLevelCategories) ? [...urlFilterParams.subLevelCategories] : []),
        priceRange: (validate.isNotEmpty(urlFilterParams) && validate.isNotEmpty(urlFilterParams.priceRange) && validate.isNotEmpty(urlFilterParams.priceRange.min) && validate.isNotEmpty(urlFilterParams.priceRange.max) ? { min: urlFilterParams.priceRange.min, max: urlFilterParams.priceRange.max } : {min: undefined, max: undefined}),
        excludeOutOfStock: (validate.isNotEmpty(urlFilterParams) && validate.isNotEmpty(urlFilterParams.excludeOutOfStock) ? urlFilterParams.excludeOutOfStock : false),
        sort : urlFilterParams.sort ? parseInt(urlFilterParams.sort) : 0,
        startAndEndPrice : (validate.isNotEmpty(urlFilterParams) && validate.isNotEmpty(urlFilterParams.startAndEndPrice) && validate.isNotEmpty(urlFilterParams.startAndEndPrice.min) && validate.isNotEmpty(urlFilterParams.startAndEndPrice.max) ? { min: urlFilterParams.startAndEndPrice.min, max: urlFilterParams.startAndEndPrice.max } : {}) 
    };
}

export const checkIfNoFilter = (sortAndFilter, minAndMaxPrice) => {
    return sortAndFilter.brands.length === 0 && sortAndFilter.subLevelCategories.length === 0 && (!sortAndFilter.priceRange.min || sortAndFilter.priceRange.min === minAndMaxPrice.min) && (!sortAndFilter.priceRange.max || sortAndFilter.priceRange.max === minAndMaxPrice.max) && !sortAndFilter.excludeOutOfStock;
}

export const checkIfFilterApplied = (sortAndFilter, previousValue) => {
    return !isEqual(previousValue.filteredBrands, sortAndFilter.brands) ||
        !isEqual(previousValue.filteredSubCategories, sortAndFilter.subLevelCategories) ||
        (previousValue.filteredRange.min !== sortAndFilter.priceRange.min) ||
        (previousValue.filteredRange.max !== sortAndFilter.priceRange.max) ||
        (parseInt(previousValue.filteredSort) !== parseInt(sortAndFilter.sort)) || 
        (previousValue.filteredOutOfStock !== sortAndFilter.excludeOutOfStock);
}

export const checkUrlAndAppliedFilter = (urlFilterParams, sortAndFilter) => {
    if (urlFilterParams && Object.keys(urlFilterParams).length > 0) {
        let response = false;
        if (urlFilterParams.subLevelCategories || sortAndFilter.subLevelCategories.length > 0) {
            if (isEqual(urlFilterParams.subLevelCategories, sortAndFilter.subLevelCategories)) {
                response = true;
            } else {
                response = false;
                return response;
            }

        }
        if (urlFilterParams.brands || sortAndFilter.brands.length > 0) {
            if (isEqual(urlFilterParams.brands, sortAndFilter.brands)) {
                response = true;
            } else {
                response = false;
                return response;
            }
        }
        if (urlFilterParams.excludeOutOfStock) {
            if (sortAndFilter.excludeOutOfStock) {
                response = true;
            } else {
                response = false;
                return response;
            }
        }
        if ((urlFilterParams.priceRange && Object.keys(urlFilterParams.priceRange).length > 0) || (sortAndFilter.priceRange.min && sortAndFilter.priceRange.max)) {
            if (urlFilterParams.priceRange && urlFilterParams.priceRange.min === sortAndFilter.priceRange.min && urlFilterParams.priceRange.max === sortAndFilter.priceRange.max) {
                response = true;
            } else {
                response = false;
                return response;
            }
        }
        if(urlFilterParams.sort !== undefined || sortAndFilter.sort !== undefined){
            if(parseInt(urlFilterParams.sort) === parseInt(sortAndFilter.sort)){
                response = true;
            } else {
                response = false;
                return response;
            }
        }
        return response
    } else {
        return false;
    }
}

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export const isEqual = (firstArr, secondArr) => {
    if (firstArr === secondArr) return true;
    if (firstArr == null || secondArr == null) return false;
    if (firstArr.length != secondArr.length) return false;
    for (var i = 0; i < firstArr.length; ++i) {
        if (firstArr[i] !== secondArr[i]) return false;
    }
    return true;
}

