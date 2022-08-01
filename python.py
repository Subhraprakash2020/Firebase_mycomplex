def f(n):
    if n ==1:
        return 1
    return n*f(n-1)

a = input()
l = len(a)
per = f(l)
dif = set(a)
for i in dif:
    temp = a.count(i)
    per = per//f(temp)
    print(i,temp,per)
print(per)
