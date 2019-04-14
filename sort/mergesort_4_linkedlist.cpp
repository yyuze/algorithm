#include <iostream>
#include<list>
using namespace std;

class node {
public:
	int value;
	node * next;
	node() { next = nullptr; }
	node(int i) {
		value = i; next = nullptr;
	}
};

class linked_list {
public:
	int num_nodes;
	node * head;
	linked_list() { num_nodes = 0; head = nullptr; }
	void make_list(int m, int n) {
		for (int i = 0; i < m; i++) {
			node * p = new node(rand() % n);
			p->next = head;
			head = p;
		}
		num_nodes = m;
	}

	void append(node* p) {
		p->next = this->head;
		this->head = p;
		++this->num_nodes;
	}
};

void sort(linked_list & L, node * p, int n) {
	if (n == 1) {
		L.head = nullptr;
		L.num_nodes = 0;
		L.append(p);
	}
	else {
		list<thread::id> thread_records;
		int boundary = n / 2;
		for (int i = 0; i < boundary; ++i) {
			p = p->next;
		}
		linked_list result1;
		linked_list result2;
		result1.head = L.head;
		result2.head = p;
		result1.num_nodes = boundary;
		result2.num_nodes = n - boundary;
		sort(result1, result1.head, result1.num_nodes);
		sort(result2, result2.head, result2.num_nodes);
		merge(L, result1.head, result1.num_nodes, result2.head, result2.num_nodes);
	}
}

void reverse(linked_list& link) {
	if (link.num_nodes < 2) {
		return;
	}
	node* index = link.head->next;
	node* previous = link.head;
	link.head->next = nullptr;
	node* next;
	while (index->next != nullptr) {
		next = index->next;
		index->next = previous;
		previous = index;
		index = next;
	}
	link.head = index;
	index->next = previous;
}

void merge(linked_list & L, node * p1, int n1, node * p2, int n2) {
	L.head = nullptr;
	L.num_nodes = 0;
	int count = n1 + n2;
	for (int i = 0; i < count; ++i) {
		node* a_node;
		if (p1 != nullptr && p2 != nullptr) {
			if (p1->value < p2->value) {
				a_node = p1;
				p1 = p1->next;
			}
			else {
				a_node = p2;
				p2 = p2->next;
			}
		}
		else {
			if (p1 != nullptr) {
				a_node = p1;
				p1 = p1->next;
			}
			else {
				a_node = p2;
				p2 = p2->next;
			}
		}
		L.append(a_node);
	}
	reverse(L);
}
