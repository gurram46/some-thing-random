function evenIndexItems(items) {
  return items.filter((_, index) => index % 2 === 0);
}

console.log(evenIndexItems(['a', 'b', 'c', 'd']));
