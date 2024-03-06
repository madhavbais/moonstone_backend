#include<iostream>
using namespace std;
int main()
{
    int n;
    cout<<"enter a number";
    cin>>n;
    int i, j;

    for (i = 1; i <= n; i++) {
        for (j = i; j <= n; j++) {
            if (i == 1 || j == i || j == n)
                cout<<j<<" ";
            else
                cout<<" ";
        }
        cout<<endl;
    }

}