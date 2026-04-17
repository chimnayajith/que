package com.que.model;

public class QueueUser {

    private int tokenNumber;
    private String name;
    private boolean priority;
    private String status;

    public QueueUser(int tokenNumber, String name, boolean priority, String status) {
        this.tokenNumber = tokenNumber;
        this.name = name;
        this.priority = priority;
        this.status = status;
    }

    public int getTokenNumber() {
        return tokenNumber;
    }

    public String getName() {
        return name;
    }

    public boolean isPriority() {
        return priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}