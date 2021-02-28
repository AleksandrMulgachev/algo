import {CharsCount, TreeItem} from "./types";

export function countSymbols(s: string): CharsCount {
  let res: CharsCount = Object.create(null);

  for (let i = 0; i < s.length; i++) {
    res[s[i]] = (res[s[i]] || 0) + 1;
  }

  return res;
}

export function generateTree(stat: CharsCount): TreeItem | null {
  type ListItem = {
    next: ListItem,
    tree: TreeItem
  } | null;

  let items: ListItem = null;

  for (const [char, count] of Object.entries(stat)) {
    items = {
      next: items,
      tree: {
        char,
        left: null,
        right: null,
        weight: count
      }
    }
  }

  if (items) {
    while (items.next) {
      let
        min1: ListItem,
        min2: ListItem,
        min1Prev: ListItem,
        min2Prev: ListItem,
        prev = items.next,
        current: ListItem = items.next.next
      ;

      if (items.tree.weight > items.next.tree.weight) {
        min1 = items.next;
        min1Prev = items;

        min2 = items;
        min2Prev = null;
      } else {
        min1 = items;
        min1Prev = null;

        min2 = items.next;
        min2Prev = items;
      }

      while (current) {
        if (current.tree.weight < min2.tree.weight) {
          if (current.tree.weight < min1.tree.weight) {
            min2 = min1;
            min2Prev = min1Prev;
            min1 = current;
          } else {
            min2 = current;
            min2Prev = prev;
          }
        }

        prev = current;
        current = current.next;
      }

      min1.tree = {
        weight: min1.tree.weight + min2.tree.weight,
        left: min1.tree,
        right: min2.tree
      }

      if (min2Prev) {
        min2Prev.next = min2.next;
      } else {
        items = min2.next!;
      }
    }

    return items.tree;
  } else {
    return null;
  }
}

export function treeWeight(tree: TreeItem | null): number {
  if (!tree) {
    return 0;
  }

  type QueueItem = { item: TreeItem, deep: number }

  let
    weight = 0,
    queue: QueueItem[] = [{deep: 0, item: tree}],
    next: QueueItem | undefined
  ;

  while (next = queue.pop()) {
    let
      current: TreeItem | null,
      deep: number
    ;

    ({item: current, deep} = next);

    while (current) {
      if (!current.right && !current.left) {
        weight += current.weight * deep;
      }

      if (current.right) {
        queue.push({item: current.right, deep: deep + 1})
      }
      current = current.left;
      deep++;
    }
  }

  return weight;
}

export function haffmanPack(s: string, dictionary: TreeItem) {
  
}
