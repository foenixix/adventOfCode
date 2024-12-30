import re, sys, os, copy, dataclasses, time, math, itertools


TEST = False
ROBOTS = 3
def main():
    start_time = time.perf_counter()
    with open('./test_input' if TEST else './input', 'r') as f:
        input = f.read().splitlines()
    print('input:')
    print(input)

    complexities = 0
    for i in input:
        print(i)
        length = solve_all(i)
        print(length)
        complexities += (length * int(i[:-1]))

    print(complexities)

    print("Took " + str(time.perf_counter() - start_time) + " seconds")


def solve_all(input):
    shortest_length = 0
    prev_character = 'A'
    for character in input:
        r1_sequences = solve_numeric(character, prev_character)
        shortest_length += solve_chain(r1_sequences, ROBOTS-1)
        prev_character = character
    return shortest_length


directional_cache = {}
def solve_chain(input_sequences, nb_remaining):
    global directional_cache
    min_length = math.inf
    for input in input_sequences:
        length = 0
        prev_character = 'A'
        for character in input:
            cache_key = (prev_character, character, nb_remaining)
            sub_length = directional_cache.get(cache_key)
            if sub_length is None:
                next_sequences = solve_directional(character, prev_character)
                if nb_remaining > 0:
                    sub_length = solve_chain(next_sequences, nb_remaining - 1)
                else:
                    sub_length = len(min(next_sequences, key=len))
                directional_cache[cache_key] = sub_length
            length += sub_length
            prev_character = character
        min_length = min(min_length, length)
    return min_length


def solve_numeric(input, start_button):
    return solve(input, {
        '7': (0, 0),
        '8': (1, 0),
        '9': (2, 0),
        '4': (0, 1),
        '5': (1, 1),
        '6': (2, 1),
        '1': (0, 2),
        '2': (1, 2),
        '3': (2, 2),
        '0': (1, 3),
        'A': (2, 3),
    }, (0, 3), start_button)


def solve_directional(input, start_button):
    return solve(input, {
        '^': (1, 0),
        'A': (2, 0),
        '<': (0, 1),
        'v': (1, 1),
        '>': (2, 1),
    }, (0, 0), start_button)


def solve(input, buttons, avoid, start_button):
    sequences = [[]]
    current = buttons.get(start_button)
    for character in input:
        target = buttons.get(character)
        dx = target[0] - current[0]
        dy = target[1] - current[1]
        illegal = None
        if current[1] == avoid[1] and target[0] == avoid[0]:
            illegal = ['<'] * -dx
        elif current[0] == avoid[0] and target[1] == avoid[1]:
            if dy < 0:
                illegal = ['^'] * -dy
            else:
                illegal = ['v'] * dy
        new_sequences = []
        for move_seq in get_move_sequences(dx, dy):
            list(move_seq)
            if illegal is None or not starts_with(move_seq, illegal):
                for seq in sequences:
                    new_sequences.append(seq + list(move_seq) + ['A'])
        sequences = new_sequences
        current = target
    return sequences


def get_move_sequences(dx, dy):
    seq = []
    if dx > 0:
        seq.extend(['>'] * dx)
    elif dx < 0:
        seq.extend(['<'] * -dx)
    if dy < 0:
        seq.extend(['^'] * -dy)
    elif dy > 0:
        seq.extend(['v'] * dy)
    return [list(perm) for perm in set(itertools.permutations(seq))]


def starts_with(array, start):
    for i in range(len(start)):
        if array[i] != start[i]:
            return False
    return True


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    main()