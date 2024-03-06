#include<iostream>
using namespace std;
int main()
{
    int n;
    cout<<"enter a number";
    cin>>n;
    int l=0,t;
    for(int i=1;i<=n;i++){
        t=1;
        for(int j=1;j<=n+l;j++){
            if(j<=n-i){
                cout<<" ";
            }
            else if(j<n){
                cout<<t++;
            }
            else{
                cout<<t--;
            }
        }
        l++;
        cout<<endl;
    }
}