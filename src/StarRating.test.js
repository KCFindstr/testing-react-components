import React from 'react';
import StarRating from './StarRating';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('renders 5 stars by default', () => {
  const { getAllByTestId } = render(<StarRating/>);
  const stars = getAllByTestId('star');
  expect(stars).toHaveLength(5);
});

it('renders a specified number of stars', () => {
  const { getAllByTestId } = render(<StarRating starCount={10}/>);
  const stars = getAllByTestId('star');
  expect(stars).toHaveLength(10);
});

it('renders empty stars with color #bbb by default', () => {
  const { getAllByTestId } = render(<StarRating/>);
  const stars = getAllByTestId('star');
  expect(stars[0].childNodes[0]).toHaveAttribute('color', '#bbb');
});

it('renders empty stars with the color of the emptyColor value', () => {
  const { getAllByTestId } = render(<StarRating emptyColor="#abc"/>);
  const stars = getAllByTestId('star');
  expect(stars[0].childNodes[0]).toHaveAttribute('color', '#abc');
});

it('renders filled stars as yellow by default', () => {
  const { getAllByTestId } = render(<StarRating value={2}/>);
  const stars = getAllByTestId('star');
  expect(stars[0].childNodes[0]).toHaveAttribute('color', 'yellow');
});

it('renders filled stars with the color of the filledColor value', () => {
  const { getAllByTestId } = render(<StarRating value={2} filledColor="blue"/>);
  const stars = getAllByTestId('star');
  expect(stars[0].childNodes[0]).toHaveAttribute('color', 'blue');
});

it('renders a star using the 1x size by default', () => {
  const { getAllByTestId } = render(<StarRating/>);
  const stars = getAllByTestId('star');
  expect(stars[0].childNodes[0]).toHaveClass('fa-1x');
});

it('renders a star using the size value', () => {
  const { getAllByTestId } = render(<StarRating size="2x"/>);
  const stars = getAllByTestId('star');
  expect(stars[0].childNodes[0]).toHaveClass('fa-2x');
});

it('renders 0 filled stars when value is 0', () => {
  const { container } = render(<StarRating value={0}/>);
  const filledStars = container.querySelectorAll('.fa-star[color="yellow"]');
  expect(filledStars).toHaveLength(0);
});

it('renders filled stars equal to value when value is greater than 0', () => {
  const { container } = render(<StarRating value={3}/>);
  const filledStars = container.querySelectorAll('.fa-star[color="yellow"]');
  expect(filledStars).toHaveLength(3);
});

it('updates when clicking on an empty star', () => {
  const onClickHandler = jest.fn();
  const { getAllByTestId } = render(<StarRating onClick={onClickHandler}/>);
  const stars = getAllByTestId('star');
  fireEvent.click(stars[2]);
	expect(onClickHandler).toHaveBeenCalledWith(3);
});

it('sets the value to 0 when clicking on a filled star', () => {
  const onClickHandler = jest.fn();
  const { getAllByTestId } = render(<StarRating value={3} onClick={onClickHandler}/>);
  const stars = getAllByTestId('star');
  fireEvent.click(stars[2]);
	expect(onClickHandler).toHaveBeenCalledWith(0);
});
