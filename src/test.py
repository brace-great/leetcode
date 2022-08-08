import random
import sys
import time


def how_long(func):
    def fun(*args, **kwargs):
        t = time.perf_counter()
        result = func(*args, **kwargs)
        print(f'func {func.__name__} cost time:{time.perf_counter() - t:.8f} s')
        return result
    return fun


@how_long
def get_input():
    input('now!')


delay = random.randint(2, 8)
print('wait....')
time.sleep(delay)

get_input()
