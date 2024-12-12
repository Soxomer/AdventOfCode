from functools import cache

stones = [int(x) for x in input().split() ]

@cache
def count(stone,step):
    if step == 0:
        return 1
    if stone == 0:
        return count(1,step-1)
    
    string = str(stone)
    length = len(string)
    if length % 2 == 0:
        return count(int(string[:length//2],step-1)) + count(int(string[length//2:]),step-1)
    return count(stone*2024,step-1)
print(sum(count(stone,75)) for stone in stones)