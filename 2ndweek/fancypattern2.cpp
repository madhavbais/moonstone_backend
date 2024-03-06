#include<iostream>
using namespace std;
int main()
{
    int n,num=1;
    cout<<"enter  a number";
    cin>>n;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=i;j++){
            cout << num++;
            if(j<i){
                cout<<"*";
            }
        }
        cout<<"\n";
    }
    num=num-n;
    int k;
    for(int i=n;i>=1;i--){
        k=num;
        for(int j=1;j<=i;j++){
            cout << num++;
            if(j<i){
                cout<<"*";
            }
        }
        num=k-i+1;
        cout<<"\n";
    }
}